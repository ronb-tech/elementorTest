import { Request, Response } from "express";
import { Album } from "../models/types";
import { getAlbumsByUserIdData } from "../services/albumService";

export const getAllAlbumsByUserId = async (req: Request, res: Response) => {
  const user_id = parseInt(req.query.user_id as string, 10);

  if (isNaN(user_id)) {
    return res.status(400).json({ message: "Invalid 'user_id' provided." });
  }

  try {
    const albums: Album[] = await getAlbumsByUserIdData(user_id);
    if (albums.length > 0) {
      res.json(albums);
    } else {
      res
        .status(404)
        .json({ message: "No albums found for the provided 'user_id'." });
    }
  } catch (error) {
    console.error("Failed to fetch albums:", error);
    res.status(500).json({ message: "Failed to fetch albums" });
  }
};
