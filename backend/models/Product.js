import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String, // Cloudinary URLs
        required: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subCategory: {
      type: String,
      default: 'All'
    },
    description: {
      type: String,
      required: true,
    },
    specifications: [
      {
        title: { type: String },
        value: { type: String },
      },
    ],
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    offerPrice: {
      type: Number,
      default: 0,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    colorOptions: [{ type: String }],
    sizeOptions: [{ type: String }],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    badge: {
      type: String,
      default: 'None',
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
