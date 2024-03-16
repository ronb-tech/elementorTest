import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    _id: Number,
    userId: Number,
    title: String,
    thumbnailUrl: String,
    limit: Number,
  },
  { versionKey: false }
);

const AlbumModel = mongoose.model("Album", albumSchema, "albums");

export default AlbumModel;
