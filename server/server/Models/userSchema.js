import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    userType: {
      type: String,
      default: 'user',
    },
    username: {
      type: String,
      unique: true,
    },
    position:{
      type: String
    },
    licenseNo:{
      type: String
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
