const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: [
        'jewelry',
        'clothing',
        'home-decor',
        'art',
        'accessories',
        'other',
      ],
    },
    images: {
      type: [Buffer],
      default: [],
    },
    artisanId: {
      type: String,
    },
    artisanName: {
      type: String,
    },
    inStock: {
      type: Number,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
