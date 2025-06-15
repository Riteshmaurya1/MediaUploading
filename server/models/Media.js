import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String, // "image", "video"
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.model("Media", mediaSchema);
