import express from "express";
import { getAllAlbumsByUserId } from "../controllers/albumController";

const albumRoutes = express.Router();

albumRoutes.get("/", getAllAlbumsByUserId);

export default albumRoutes;
