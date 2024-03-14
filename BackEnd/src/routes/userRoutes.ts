import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
} from "../controllers/userController";

const userRoutes = express.Router();
userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUserById);
userRoutes.delete("/delete/:id", deleteUserById);

export default userRoutes;
