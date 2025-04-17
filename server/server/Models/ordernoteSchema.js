import mongoose from 'mongoose';

const ordernotesSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('OrderNote', ordernotesSchema);
