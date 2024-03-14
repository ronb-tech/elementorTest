import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  addUser,
} from "../controllers/userController";

const userRoutes = express.Router();
userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUserById);
userRoutes.delete("/delete/:id", deleteUserById);
userRoutes.put("/update", updateUser);
userRoutes.put("/create", addUser);

export default userRoutes;
