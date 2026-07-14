import Category from '../models/Category.js';
import cloudinary from '../utils/cloudinary.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res, next) => {
  try {
    const { name, image, status } = req.body;

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      res.status(400);
      throw new Error('Category already exists');
    }

    const category = new Category({
      name,
      image,
      status,
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res, next) => {
  try {
    const { name, image, status } = req.body;

    const category = await Category.findById(req.params.id);

    if (category) {
      // If a new image is provided and it's different from the old one
      if (image && category.image && image !== category.image) {
        // Delete old image from Cloudinary
        try {
          if (category.image.includes('cloudinary.com')) {
            const urlParts = category.image.split('/');
            const filenameWithExt = urlParts[urlParts.length - 1];
            const folder = urlParts[urlParts.length - 2];
            const filename = filenameWithExt.split('.')[0];
            const publicId = `${folder}/${filename}`;
            
            await cloudinary.uploader.destroy(publicId);
          }
        } catch (cloudErr) {
          console.error('Failed to delete old image from Cloudinary:', cloudErr);
        }
      }

      category.name = name || category.name;
      category.image = image || category.image;
      category.status = status || category.status;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404);
      throw new Error('Category not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      if (category.image) {
        try {
          if (category.image.includes('cloudinary.com')) {
            const urlParts = category.image.split('/');
            const filenameWithExt = urlParts[urlParts.length - 1];
            const folder = urlParts[urlParts.length - 2];
            const filename = filenameWithExt.split('.')[0];
            const publicId = `${folder}/${filename}`;
            
            await cloudinary.uploader.destroy(publicId);
          }
        } catch (cloudErr) {
          console.error('Failed to delete image from Cloudinary:', cloudErr);
        }
      }

      await category.deleteOne();
      res.json({ message: 'Category removed' });
    } else {
      res.status(404);
      throw new Error('Category not found');
    }
  } catch (error) {
    next(error);
  }
};
