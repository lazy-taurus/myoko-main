import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
});

module.exports =
  mongoose.models.Review || mongoose.model('Review', ReviewSchema);
