import {
  readJsonFile,
  writeJsonFile,
  USERS_FILE_PATH,
  ALBUMS_FILE_PATH,
  PHOTOS_FILE_PATH,
} from "../utils/crudFiles";
import {
  getCollection,
  usersCollection,
  albumsCollection,
  photosCollection,
} from "../utils/mongoSetup";

import { Document, ObjectId } from "mongodb";
import { User, Album, Photo } from "../models/types";

import dotenv from "dotenv";
dotenv.config();

export async function fetchData<T extends Document>({
  collectionName,
  filePath,
}: {
  collectionName?: string;
  filePath?: string;
}): Promise<T[]> {
  let data: T[] = [];
  const isUseMongoDB = process.env.USE_MONGODB === "true";
  if (isUseMongoDB) {
    if (!collectionName) {
      throw new Error(
        "MongoDB collection name must be provided when using MongoDB."
      );
    }
    const collection = await getCollection<T>(collectionName);
    data = (await collection.find({}).toArray()) as T[];
  } else {
    if (!filePath) {
      throw new Error("File path must be provided when not using MongoDB.");
    }
    data = await readJsonFile<T[]>(filePath);
  }

  return data;
}

export async function deleteItem<T extends Document>({
  collectionName,
  filePath,
  itemId,
}: {
  collectionName?: string;
  filePath?: string;
  itemId: number;
}): Promise<boolean> {
  const isUseMongoDB = process.env.USE_MONGODB === "true";

  if (isUseMongoDB) {
    if (!collectionName) {
      throw new Error(
        "MongoDB collection name must be provided when using MongoDB."
      );
    }
    // const collection = await getCollection<T>(collectionName);
    // const result = await collection.deleteOne({ _id: new ObjectId(itemId) });
    // return result.deletedCount === 1;
    return true;
  } else {
    if (!filePath) {
      throw new Error("File path must be provided when not using MongoDB.");
    }

    let items = await readJsonFile<T[]>(filePath);
    const initialLength = items.length;
    items = items.filter((item) => item._id.toString() !== itemId);
    await writeJsonFile(filePath, items);
    return items.length < initialLength;
  }
}

export const mapHandles = {
  users: {
    allUsers: {
      collectionName: usersCollection,
      filePath: USERS_FILE_PATH,
    },
  },
  albums: {
    allAlbums: {
      collectionName: albumsCollection,
      filePath: ALBUMS_FILE_PATH,
    },
  },
  photos: {
    allImages: {
      collectionName: photosCollection,
      filePath: PHOTOS_FILE_PATH,
    },
  },
};
