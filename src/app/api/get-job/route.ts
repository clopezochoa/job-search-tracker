import { JobData } from "@/app/client-lib";
import { NextResponse } from "next/server";
import { connectDatabase } from "../../server-lib";

const getJobs = async (key: string) => {
  if(process.env.JOBS) {
    const {client, collection} = await connectDatabase(process.env.JOBS);
    const jobs = await collection.find({ key: key }).toArray() as Array<JobData>;
    await client.close();
    return jobs;
  } else {
    throw new Error("No key for the collection was received from the environment.")
  }
}

export const POST = async (req: Request, res: Response) => {
  try {
    const key = await req.json() as string;
    const jobs = await getJobs(key);
    return NextResponse.json(jobs, {status:200})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}