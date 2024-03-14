import express from "express";
import { getAlbumsByUserId } from "../controllers/albumController";

const albumRoutes = express.Router();
albumRoutes.get("/:user_id", getAlbumsByUserId);

export default albumRoutes;
