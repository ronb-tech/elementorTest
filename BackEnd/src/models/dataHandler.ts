import { getCollection } from "../utils/mongoSetup";
import { readJsonFile, writeJsonFile } from "../utils/crudFiles";
import dotenv from "dotenv";
dotenv.config();

export async function fetchData<T>({
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
    data = await collection.find({}).toArray();
  } else {
    if (!filePath) {
      throw new Error("File path must be provided when not using MongoDB.");
    }

    data = await readJsonFile<T[]>(filePath);
  }

  return data;
}
