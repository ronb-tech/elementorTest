import { Request, Response } from "express";
import { Photo } from "../models/types";
import { getAllPhotos } from "../utils/getMockData";
import {
  deleteItem,
  updateItem,
  addItem,
  fetchData,
  mapHandles,
} from "../models/dataHandler";

let photos: Photo[] = [];

export const getPhotos = async (req: Request, res: Response) => {
  const album_id = parseInt(req.params.album_id);

  try {
    if (album_id <= 0 || isNaN(album_id)) {
      return res.status(400).json({ message: "Invalid 'album_id' provided." });
    }
    photos = await fetchData<Photo>({
      ...mapHandles.photos.allImages,
    });
    const photosByAlbumId = photos.filter(
      (photo) => photo.albumId === album_id
    );
    res.json(photosByAlbumId || []);
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    res.status(500).json({ message: "Failed to fetch photos" });
  }
};

export const addPhoto = async (req: Request, res: Response) => {
  const photoData = req.body;
  if (!photoData) {
    return res
      .status(400)
      .send({ message: "Photo data is missing", ok: false });
  }

  try {
    const response = await addItem({
      ...mapHandles.photos.allImages,
      item: photoData,
    });
    if (response.ok) {
      res.status(201).send({
        response,
        ok: response.ok,
      });
    } else {
      throw new Error("Failed to add photo");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", ok: false });
  }
};
export const deletePhotoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const photos = await fetchData<Photo>({
    ...mapHandles.photos.allImages,
  });
  const photo = photos.find((photo) => photo._id.toString() === id);

  if (photo) {
    try {
      const response = await deleteItem({
        ...mapHandles.photos.allImages,
        itemId: photo._id,
      });
      if (response) {
        res
          .status(200)
          .send({ message: "Photo deleted successfully", ok: true });
      } else {
        throw new Error("Failed to delete photo");
      }
    } catch (error) {
      console.error("Failed to delete photo:", error);
      res.status(404).send({ message: "Photo not found", ok: false });
    }
  } else {
    res.status(404).send({ message: "Photo not found", ok: false });
  }
};
