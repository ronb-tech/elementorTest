import { User, Album, Photo } from "../models/types";
import { readJsonFile } from "@/utils/crudFiles";
import path from "path";

const USERS_FILE_PATH = path.join(__dirname, "utils", "data", "users.json");
const ALBUMS_FILE_PATH = path.join(__dirname, "utils", "data", "albums.json");

export const getUsersData = async (
  usersFilePath: string = USERS_FILE_PATH,
  albumsFilePath: string = ALBUMS_FILE_PATH
): Promise<(User & { albumCount: number })[]> => {
  let users: User[] = await readJsonFile<User[]>(usersFilePath);
  let albums: Album[] = await readJsonFile<Album[]>(albumsFilePath);

  try {
    users = await readJsonFile<User[]>(usersFilePath);
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