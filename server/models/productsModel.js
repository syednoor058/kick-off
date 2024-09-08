import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    productType: {
      type: String,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "category",
      required: true,
    },
    photo: {
      type: [String],
      required: true,
    },
    isAvailable: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);


export default mongoose.model("products", productsSchema);




