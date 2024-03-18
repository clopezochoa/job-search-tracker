import { UserData } from "@/app/client-lib";
import { NextResponse } from "next/server";
import { connectDatabase } from "../../server-lib";

const registerUser = async (userdata: UserData) => {
  if(process.env.USERS) {
    const {client, collection} = await connectDatabase(process.env.USERS);
    const checkExisting = await collection.findOne({ email: userdata.email });
  
    if (checkExisting) {
      await client.close();
      throw new Error('User already exists!');
    }
  
    const user = await collection.insertOne(userdata);  
    client.close();
  
    return user;
  
  } else {
    throw new Error("No key for the collection was received from the environment.")
  }
}

export const POST = async (req: Request, res: Response) => {
  try {
    const userdata = await req.json() as UserData;
    const registerStatus = await registerUser(userdata);
    return NextResponse.json(registerStatus, {status:201})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}