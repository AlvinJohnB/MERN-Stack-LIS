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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Physician',
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
    isDiscouted:{
      type: Boolean,
      default: false,
    },
    queue_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    closed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    order_notes:[
      {
        note: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'OrderNotes',
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);
