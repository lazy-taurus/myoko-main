import mongoose from 'mongoose';

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  isArtisan: {
    type: Boolean,
    default: false,
  },
  accessToken: {
    type: String,
  },
  otp: {
    otp: { type: String, required: false },
    otpCreatedAt: { type: Date, required: false },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
