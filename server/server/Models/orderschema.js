import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema(
  {
    labnumber: {
      type: String,
      required: true,
      unique: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    tests: [
      {
        test: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Test',
        }
      }
    ],
    requesting_physician: {
      type: String,
    },
    patient_type: {
      type: String,
    },
    total: {
      type: Number,
    },
    chemistry_total: {
      type: Number,
    },
    hematology_total: {
      type: Number,
    },
    cm_total: {
      type: Number,
    },
    sero_total: {
      type: Number,
    },
    status: {
      type: String,
      default: 'PENDING',
    },
    progress:{
      type: Number
    },
    isDiscounted:{
      type: Boolean,
      default: false,
    },
    encoded_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);
