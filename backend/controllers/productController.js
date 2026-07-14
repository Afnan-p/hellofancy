import Product from '../models/Product.js';
import cloudinary from '../utils/cloudinary.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const products = await Product.find({ ...keyword, ...category }).populate('category', 'name');
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      category: req.body.category || '60d5ecb54a7f0e3f848b4567', // Placeholder ID
      description: 'Sample description',
      images: ['/images/sample.jpg'],
      sku: `SKU-${Date.now()}`,
      stockQuantity: 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const {
      name,
      price,
      description,
      images,
      category,
      stockQuantity,
      sku,
      offerPrice,
      isFeatured,
      status,
      colorOptions,
      sizeOptions,
      specifications,
      subCategory,
      badge
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      // If a new image array is provided and it's different from the old one
      if (images && images.length > 0 && product.images && product.images.length > 0) {
        if (images[0] !== product.images[0]) {
          // Delete old image from Cloudinary
          try {
            if (product.images[0].includes('cloudinary.com')) {
              const urlParts = product.images[0].split('/');
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
      }

      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.images = images || product.images;
      product.category = category || product.category;
      product.stockQuantity = stockQuantity !== undefined ? stockQuantity : product.stockQuantity;
      product.sku = sku || product.sku;
      product.offerPrice = offerPrice !== undefined ? offerPrice : product.offerPrice;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.status = status || product.status;
      product.colorOptions = colorOptions || product.colorOptions;
      product.sizeOptions = sizeOptions || product.sizeOptions;
      product.specifications = specifications || product.specifications;
      product.subCategory = subCategory || product.subCategory;
      product.badge = badge || product.badge;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // Delete images from Cloudinary
      if (product.images && product.images.length > 0) {
        for (const imageUrl of product.images) {
          try {
            // Extract public_id from Cloudinary URL
            // URL format: https://res.cloudinary.com/cloud_name/image/upload/v12345/folder/filename.ext
            if (imageUrl.includes('cloudinary.com')) {
              const urlParts = imageUrl.split('/');
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
      }

      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};
