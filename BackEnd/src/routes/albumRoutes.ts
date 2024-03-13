import express from "express";
import { getAlbums } from "../controllers/albumController";

const albumRoutes = express.Router();
albumRoutes.get("/:user_id", getAlbums);

export default albumRoutes;
