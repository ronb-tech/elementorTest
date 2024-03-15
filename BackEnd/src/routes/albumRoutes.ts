import express from "express";
import {
  getAllAlbumsByUserId,
  updateAlbum,
  deleteAlbumById,
} from "../controllers/albumController";

const albumRoutes = express.Router();

albumRoutes.get("/", getAllAlbumsByUserId);
albumRoutes.put("/update", updateAlbum);
albumRoutes.delete("/delete/:id", deleteAlbumById);

export default albumRoutes;
