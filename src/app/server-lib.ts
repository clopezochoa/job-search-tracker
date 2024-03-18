import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

async function connectMongo() {
  const client = new MongoClient(process.env.DB_URI!, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  await client.connect();
  return client;
}

export const connectDatabase = async (collectionKey: string) => {
  const client = await connectMongo();
  const db = client.db(process.env.DB)
  const collection = db.collection(collectionKey);
  return {client, db, collection};
}

export type Id = ObjectId;