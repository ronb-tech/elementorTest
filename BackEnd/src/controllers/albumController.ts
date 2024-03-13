import { Request, Response } from "express";
import { Album } from "../models/types";
import { getAllalbums } from "../utils/getMockData";

let albums: Album[] = [];

export const getAlbums = async (req: Request, res: Response) => {
  const user_id = parseInt(req.params.user_id);

  try {
    if (user_id <= 0 || isNaN(user_id)) {
      return res.status(400).json({ message: "Invalid 'user_id' provided." });
    }
    albums = await getAllalbums();
    const albumsByUserId = albums.filter((album) => album.userId === user_id);
    res.json(albumsByUserId || []);
  } catch (error) {
    //log the error
    console.error("Failed to fetch albums:", error);
    res.status(500).json({ message: "Failed to fetch albums" });
  }
};
