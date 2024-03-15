import express from "express";
import {
  getPhotos,
  deletePhotoById,
  addPhoto,
} from "../controllers/photoController";

const photosRoutes = express.Router();
photosRoutes.get("/:album_id", getPhotos);
photosRoutes.put("/update", deletePhotoById);
photosRoutes.post("/create", addPhoto);

export default photosRoutes;
