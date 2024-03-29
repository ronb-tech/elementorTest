import { Request, Response } from "express";
import { Album } from "../models/types";
import { getAlbumsByUserIdData } from "../services/albumService";
import {
  deleteItem,
  updateItem,
  addItem,
  fetchData,
  mapHandles,
} from "../models/dataHandler";

export const getAllAlbumsByUserId = async (req: Request, res: Response) => {
  const user_id = parseInt(req.query.user_id as string, 10);
  const album_id = parseInt(req.query.album_id as string, 10);

  if (isNaN(user_id)) {
    return res.status(400).json({ message: "Invalid 'user_id' provided." });
  }

  try {
    const albums: Album[] = await getAlbumsByUserIdData(user_id);
    if (!isNaN(album_id)) {
      const album = albums.find((album) => album._id === album_id);
      if (album) {
        return res.json(album);
      }
    }
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

export const addAlbum = async (req: Request, res: Response) => {
  const albumData = req.body;
  if (!albumData) {
    return res.status(400).send({ message: "User data is missing", ok: false });
  }

  addItem({
    ...mapHandles.albums.allAlbums,
    item: albumData,
  })
    .then((response) => {
      if (response.ok) {
        res.status(201).send({ response });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: "Server error", ok: false });
    });
};

export const updateAlbum = async (req: Request, res: Response) => {
  const updateData = req?.body;
  if (!updateData && !updateData._id) {
    return res
      .status(400)
      .send({ message: "Update data is missing", ok: false });
  }

  updateItem({
    ...mapHandles.albums.allAlbums,
    updateData,
  })
    .then((response) => {
      if (response) {
        res
          .status(200)
          .send({ message: "User updated successfully", ok: true });
      } else {
        res.status(404).send({ message: "User not found", ok: false });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: "Server error", ok: false });
    });
};

export const deleteAlbumById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const albums: Album[] = await fetchData<Album>({
    ...mapHandles.albums.allAlbums,
  });
  const album = albums.find((album) => album._id.toString() === id);

  if (album) {
    deleteItem({
      ...mapHandles.albums.allAlbums,
      itemId: album?._id,
    })
      .then((response) => {
        if (response) {
          return res.status(200).send({ message: "album deleted", ok: true });
        }
      })
      .catch(() => {
        return res.status(404).send({ message: "album not found", ok: false });
      });
  } else {
    res.status(500).send("Server error");
  }
};
