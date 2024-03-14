import { User, Album, Photo } from "../models/types";
const fetch = require("node-fetch");
import dotenv from "dotenv";
dotenv.config();

const baseUrl =
  process.env.JSONPLACEHOLDER_URL || "https://jsonplaceholder.typicode.com/";
const imagePath = process.env.PICSUM_URL || "https://picsum.photos/id/";

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${baseUrl}users`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const users = await response.json();
    const formattedUsers = users.map((user: any) => {
      return {
        _id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatarUrl: `https://robohash.org/${user.id}?set=set1`,
      };
    });
    return formattedUsers;
  } catch (err) {
    console.error("getUsers", err);
    return [];
  }
};

export const getAllalbums = async (): Promise<Album[]> => {
  try {
    const response = await fetch(`${baseUrl}albums`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const albums = await response.json();
    const formattedAlbums = albums.map(({ id, ...rest }: any) => ({
      ...rest,
      _id: id,
    }));

    return formattedAlbums;
  } catch (err) {
    console.error("getAlbums", err);
    return [];
  }
};

export const getAllPhotos = async (): Promise<Photo[]> => {
  try {
    const response = await fetch(`${baseUrl}photos`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const photos = await response.json();
    const imageDeafultSize = 600;
    const imageThumbSize = 200;

    const photosFormat = photos.map(({ id, ...rest }: any) => ({
      ...rest,
      _id: id,
      url: `${imagePath}${id}/${imageDeafultSize}/${imageDeafultSize}`,
      thumbnailUrl: `${imagePath}${id}/${imageThumbSize}/${imageThumbSize}`,
    }));

    return photosFormat;
  } catch (err) {
    console.error("getAlbums", err);
    return [];
  }
};
