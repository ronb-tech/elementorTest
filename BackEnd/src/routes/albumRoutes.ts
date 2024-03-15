import express from "express";
import {
  getAllAlbumsByUserId,
  updateAlbum,
  deleteAlbumById,
  addAlbum,
} from "../controllers/albumController";

const albumRoutes = express.Router();

albumRoutes.get("/", getAllAlbumsByUserId);
albumRoutes.put("/update", updateAlbum);
albumRoutes.delete("/delete/:id", deleteAlbumById);
albumRoutes.post("/create", addAlbum);

export default albumRoutes;
