import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'hello-fancy', // Specify the folder Name
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    format: 'webp', // Automatically convert all uploads to WebP
  },
});

const upload = multer({ storage: storage });

// POST /api/upload
// Accepts multipart/form-data with a field named "image"
router.post('/', protect, admin, upload.single('image'), (req, res) => {
  if (req.file && req.file.path) {
    res.json({
      message: 'Image uploaded successfully',
      imageUrl: req.file.path,
    });
  } else {
    res.status(400).json({ message: 'Image upload failed' });
  }
});

export default router;
