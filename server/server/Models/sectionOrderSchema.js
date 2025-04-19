
import mongoose from 'mongoose';

const sectionOrderSchema = new mongoose.Schema(
  {
    labnumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    section:{
        type: String,
        required: true,
    },
    tests: [
      {
        test: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Test',
        },
        result:{
            type: String,
            default: '',
        }
      }
    ],
   status:{
    type: String,
    default: 'Pending',
   },
    performed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    released_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    pathologist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('SectionOrder', sectionOrderSchema);
