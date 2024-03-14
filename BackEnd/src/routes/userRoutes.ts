import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
} from "../controllers/userController";

const userRoutes = express.Router();
userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUserById);
userRoutes.get("/delete/:id", getUserById);

export default userRoutes;
