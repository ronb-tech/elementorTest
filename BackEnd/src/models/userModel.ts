import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  username: String,
  email: String,
  avatarUrl: String,
});

const UserModel = mongoose.model("User", userSchema, "users");

export default UserModel;
