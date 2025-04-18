import mongoose from 'mongoose';

const testschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    testcode: {
      type: String,
      unique: true,
    },
    section: {
      type: String,
    },
    unit:{
      type: String,
    },
    options:{
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    discounted_price: {
      type: Number,
      required: true,
    },
    isquali:{
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
    package: {
      type: Boolean,
      default: false,
    },
    reference_value_male: {
      type: String,
    },
    reference_value_female:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Test', testschema);
