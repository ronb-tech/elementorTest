import express from "express";
import { getPhotos } from "../controllers/photoController";

const photosRoutes = express.Router();
photosRoutes.get("/:album_id", getPhotos);

export default photosRoutes;
