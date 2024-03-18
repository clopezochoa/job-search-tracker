import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { connectDatabase } from "../../server-lib";

const getKeywords = async () => {
  if(process.env.KEYWORDS) {
    const {client, collection} = await connectDatabase(process.env.KEYWORDS)
    const keywordsData = await collection.find().toArray() as Array<{_id: ObjectId, keyword: string}>;
    const keywords = keywordsData.map(kData => kData.keyword);
    await client.close();
    return keywords;
  } else {
    throw new Error("No key for the collection was received from the environment.")
  }
}

const postKeywords = async (keywords: Array<string>) => {
  if(process.env.KEYWORDS) {
    const {client, collection} = await connectDatabase(process.env.KEYWORDS);
    const insertedItems = await collection.insertMany(keywords.map(value => {return {keyword: value}}));
    await client.close();
    return insertedItems;
  } else {
    throw new Error("No key for the collection was received from the environment.")
  }
}

export const GET = async (req: Request, res: Response) => {
  try {
    const keywords = await getKeywords();
    return NextResponse.json(keywords, {status:200})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}

export const POST = async (req: Request, res: Response) => {
  try {
    const keywords = await req.json() as Array<string>;
    const postStatus = await postKeywords(keywords);
    return NextResponse.json(postStatus, {status:201})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}