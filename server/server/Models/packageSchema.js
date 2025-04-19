import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Package', packageSchema);
