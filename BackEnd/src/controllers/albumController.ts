import { Request, Response } from "express";
import { Album } from "../models/types";
import { getAlbumsByUserIdData } from "../services/albumService";

export const getAlbumsByUserId = async (req: Request, res: Response) => {
  const user_id = parseInt(req.params.user_id);
  let albums: Album[] = [];

  try {
    if (user_id <= 0 || isNaN(user_id)) {
      return res.status(400).json({ message: "Invalid 'user_id' provided." });
    }
    albums = await getAlbumsByUserIdData(user_id);
    res.json(albums);
  } catch (error) {
    console.error("Failed to fetch albums:", error);
    res.status(500).json({ message: "Failed to fetch albums" });
  }
};
