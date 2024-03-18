import { JobData } from "@/app/client-lib";
import { NextResponse } from "next/server";
import { connectDatabase } from "../../server-lib";

const postJob = async (job: JobData) => {
  if(process.env.JOBS) {
    const {client, collection} = await connectDatabase(process.env.JOBS);
    const checkExisting = await collection.findOne({ key: job.key, company: job.company});
  
    if (checkExisting) {
      await client.close();
      throw new Error('Job already exists!');
    }
  
    const result = await collection.insertOne(job);
    await client.close();
    return result;
  } else {
    throw new Error("No key for the collection was received from the environment.")
  }
}

export const POST = async (req: Request, res: Response) => {
  try {
    const job = await req.json() as JobData;
    const postStatus = await postJob(job);
    return NextResponse.json(postStatus, {status:201})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}