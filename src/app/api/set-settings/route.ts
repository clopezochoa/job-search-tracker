import { NextResponse } from "next/server";
import { connectDatabase } from "../../server-lib";
import { SettingsModel } from "@/app/providers/context";

const postSettings = async (settings: SettingsModel, key: string) => {
  if(process.env.USERS) {
    const {client, collection} = await connectDatabase(process.env.USERS);
    const user = await collection.findOne({key: key});
    if(user) {
      const result = await collection.updateOne({ _id: user._id}, { $set: { settings: settings } })
      await client.close();
      return result;
    } else {
      await client.close();
      throw new Error('User not found.');
    }
  } else {
    throw new Error("No key for the collection was received from the environment.")
  }
}

export const POST = async (req: Request, res: Response) => {
  try {
    const {settings, key} = await req.json() as {settings: SettingsModel, key: string};
    const postStatus = await postSettings(settings, key);
    return NextResponse.json(postStatus, {status:200})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}