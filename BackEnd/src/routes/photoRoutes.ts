import express from "express";
import {
  getPhotos,
  deletePhotoById,
  addPhoto,
} from "../controllers/photoController";

const photosRoutes = express.Router();
photosRoutes.get("/:album_id", getPhotos);
photosRoutes.delete("/delete/:id", deletePhotoById);
photosRoutes.post("/create", addPhoto);

export default photosRoutes;
