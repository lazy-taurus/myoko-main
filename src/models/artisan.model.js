import mongoose from 'mongoose';

const ArtisanSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profileImage: {
      type: [Buffer],
      default: [],
    },
    bio: {
      type: String,
    },
    location: {
      village: { type: String },
      district: {
        type: String,
      },
      state: {
        type: String,
      },
    },
    familyTradition: { type: String },
    craftDetails: [
      {
        name: { type: String },
        description: { type: String },
        culturalSignificance: { type: String },
        materials: [{ type: String }],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Artisan || mongoose.model('Artisan', ArtisanSchema);
