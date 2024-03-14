import { Request, Response } from "express";
import { Photo } from "../models/types";
import { getAllPhotos } from "../utils/getMockData";

let photos: Photo[] = [];

export const getPhotos = async (req: Request, res: Response) => {
  const album_id = parseInt(req.params.album_id);

  try {
    if (album_id <= 0 || isNaN(album_id)) {
      return res.status(400).json({ message: "Invalid 'album_id' provided." });
    }
    photos = await getAllPhotos();
    const photosByAlbumId = photos.filter(
      (photo) => photo.albumId === album_id
    );
    res.json(photosByAlbumId || []);
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    res.status(500).json({ message: "Failed to fetch photos" });
  }
};
