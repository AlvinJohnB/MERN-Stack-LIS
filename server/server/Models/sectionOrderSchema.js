
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
    global_comments: {
      type: String,
      default: '',
    },
   status:{
    type: String,
    default: 'Pending',
   },
    performed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: ''
    },
    released_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: ''
    },
    pathologist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: ''
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('SectionOrder', sectionOrderSchema);
