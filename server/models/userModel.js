import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'products',
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      cart: [cartSchema],
      role: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true }
  );

export default mongoose.model('users', userSchema)