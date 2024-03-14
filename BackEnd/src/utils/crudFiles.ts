import path from "path";
import { promises as fs } from "fs";

export async function readJsonFile<T>(filePath: string): Promise<T> {
  const data = await fs.readFile(filePath, { encoding: "utf-8" });
  return JSON.parse(data) as T;
}

export async function writeJsonFile<T>(
  filePath: string,
  data: T
): Promise<void> {
  const jsonData = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, jsonData, { encoding: "utf-8" });
}

export const USERS_FILE_PATH = path.join(__dirname, "data", "users.json");
export const ALBUMS_FILE_PATH = path.join(__dirname, "data", "albums.json");
export const PHOTOS_FILE_PATH = path.join(__dirname, "data", "photos.json");
