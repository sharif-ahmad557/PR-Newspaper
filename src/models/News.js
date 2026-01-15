import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  district: { type: String, required: true },
  division: { type: String, required: true },
  popularity: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isBreaking: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.News || mongoose.model("News", NewsSchema);
