import express from "express";
import {
  getAllAlbumsByUserId,
  updateAlbum,
} from "../controllers/albumController";

const albumRoutes = express.Router();

albumRoutes.get("/", getAllAlbumsByUserId);
albumRoutes.put("/update", updateAlbum);

export default albumRoutes;
