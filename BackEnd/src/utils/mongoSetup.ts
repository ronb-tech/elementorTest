import { MongoClient, Collection, Document } from "mongodb";
const mongoose = require("mongoose");

//will be stored as secred keys...
const username = "ronbersh";
const password = encodeURIComponent("QG85@uv*a%5k8EW");
const clusterAddress = "cluster0.eqgi702.mongodb.net";
const dbName = "testDB";
const url = `mongodb+srv://${username}:${password}@${clusterAddress}/${dbName}?retryWrites=true&w=majority`;

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

export const startMongo = async () => {
  mongoose
    .connect(`${url}/${dbName}`, {})
    .then(() => {
      console.log("Connected to MongoDB...");
    })
    .catch((err: any) => console.error("Could not connect to MongoDB...", err));
};
