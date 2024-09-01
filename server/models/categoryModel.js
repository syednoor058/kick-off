import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timeStamps: true }
);

export default mongoose.model("category", categorySchema);
