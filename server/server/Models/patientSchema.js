import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    pid: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    middlename: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    bday: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    identificationNo: {
      type: Number,
    },
    phone: {
      type: String,
    },
    address: {  
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    diagnosis: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Diagnosis',
        }

        ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Patient', patientSchema);
