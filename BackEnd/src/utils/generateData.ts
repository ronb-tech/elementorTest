import { promises as fs } from "fs";
import path from "path";
import { getUsers, getAllalbums, getAllPhotos } from "./getMockData";

export const initData = async () => {
  const dataDir = path.join(__dirname, "data");
  await fs.mkdir(dataDir, { recursive: true });

  const usersFilePath = path.join(dataDir, "users.json");
  const albumsFilePath = path.join(dataDir, "albums.json");
  const photosFilePath = path.join(dataDir, "photos.json");

  // Check if files exist and create them if they do not
  const filesToCheck = [usersFilePath, albumsFilePath, photosFilePath];
  const checkFilesPromises = filesToCheck.map(async (filePath) => {
    try {
      await fs.access(filePath);
      console.log(`data for ${filePath} already exists.`);
    } catch {
      if (filePath.includes("users")) {
        const users = await getUsers();
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
      } else if (filePath.includes("albums")) {
        const albums = await getAllalbums();
        await fs.writeFile(filePath, JSON.stringify(albums, null, 2));
      } else if (filePath.includes("photos")) {
        const photos = await getAllPhotos();
        await fs.writeFile(filePath, JSON.stringify(photos, null, 2));
      }
      console.log(`Created ${filePath}`);
    }
  });

  await Promise.allSettled(checkFilesPromises);
};

initData().catch(console.error);
