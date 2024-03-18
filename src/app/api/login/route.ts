import { UserData } from "@/app/client-lib";
import { compare } from "bcrypt-ts";
import { NextResponse } from "next/server";
import { connectDatabase } from "../../server-lib";

const loginUser = async (userdata: UserData) => {
  if(process.env.USERS) {
    const {client, collection} = await connectDatabase(process.env.USERS);
    const user = await collection.findOne({ email: userdata.email });
  
    if (!user) {
      await client.close();
      throw new Error('The user doesn\'t exist!');
    }
  
    const hash = user.password;
    const matchPassword = await compare(userdata.password, hash);
  
    if (!matchPassword) {
      await client.close();
      throw new Error('Username or password is incorrect!');
    }

    await client.close();
    return user;
  } else {
    throw new Error("No key for the collection was received from the environment.")
  }
}

export const POST = async (req: Request, res: Response) => {
  try {
    const userdata = await req.json() as UserData;
    const user = await loginUser(userdata);
    return NextResponse.json(user, {status:200});
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}