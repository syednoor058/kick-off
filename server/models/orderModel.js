import mongoose from "mongoose";

const orderProduct = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const buyerDetails = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  appartment: {
    type: String,
    default: "N/A",
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    default: "N/A",
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  sendAccNum: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  product: [orderProduct],
  buyer: buyerDetails,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  progress: {
    type: String,
    required: true,
    default: "Order in progress",
  },
  feedback: {
    type: String,
    default: "N/A",
  }
}, { timestamps: true });

export default mongoose.model("orders", orderSchema);
