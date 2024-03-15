import express from "express";
import {
  getAllAlbumsByUserId,
  getAlbumsByUserId,
} from "../controllers/albumController";

const albumRoutes = express.Router();
albumRoutes.get("/:user_id", getAllAlbumsByUserId);

export default albumRoutes;
