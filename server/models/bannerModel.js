import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    url: {
        type: [String],
        required: true
    }
})

export default mongoose.model("carausol", bannerSchema);