import { MongoClient, Collection, Document } from "mongodb";

const url = "mongodb://yourMongoDBUrl";
const dbName = "yourDbName";

const usersCollection = "users";
const albumsCollection = "albums";
const photosCollection = "photos";

export async function getCollection<T extends Document>(
  collectionName: string
): Promise<Collection<T>> {
  const client = await MongoClient.connect(url, {});
  const db = client.db(dbName);
  return db.collection<T>(collectionName);
}

export { usersCollection, albumsCollection, photosCollection };
