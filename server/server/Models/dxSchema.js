import mongoose from 'mongoose';

const dxSchema = new mongoose.Schema(
  {
    diagnosis: {
      type: String,
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Diagnosis', dxSchema);
