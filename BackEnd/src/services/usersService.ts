import { User, Album, Photo } from "../models/types";
import {
  readJsonFile,
  USERS_FILE_PATH,
  ALBUMS_FILE_PATH,
} from "../utils/crudFiles";
import {
  getCollection,
  usersCollection,
  albumsCollection,
  photosCollection,
} from "../utils/mongoSetup";

import path from "path";
import dotenv from "dotenv";
dotenv.config();

const useMongoDB = process.env.USE_MONGODB;

export const getUsersData = async (
  usersFilePath: string = USERS_FILE_PATH,
  albumsFilePath: string = ALBUMS_FILE_PATH
): Promise<(User & { albumCount: number })[]> => {
  let users: User[] = [];
  let albums: Album[] = [];

  console.log("use mongo", useMongoDB);

  try {
    if (!useMongoDB) {
      const collection = await getCollection<User>(usersCollection);
      users = await collection.find({}).toArray();
    } else {
      users = await readJsonFile<User[]>(usersFilePath);
    }
  } catch (error) {
    console.error(`Failed to read users from file: ${usersFilePath}`, error);
    throw new Error("Failed to load user data");
  }

  try {
    albums = await readJsonFile<Album[]>(albumsFilePath);
  } catch (error) {
    console.error(`Failed to read albums from file: ${albumsFilePath}`, error);
    throw new Error("Failed to load album data");
  }

  const albumCountByUserId = albums.reduce((acc, album) => {
    acc[album.userId] = (acc[album.userId] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const usersWithAlbumCount = users.map((user) => ({
    ...user,
    albumCount: albumCountByUserId[user.id] || 0,
  }));

  return usersWithAlbumCount;
};
