import { EventData, JobData } from "@/app/client-lib";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { connectDatabase } from "../../server-lib";

const postEvent = async (event: EventData, jobId: ObjectId) => {
  if(process.env.JOBS) {
    const {client, collection} = await connectDatabase(process.env.JOBS);
    const id = new ObjectId(jobId);
    const job = await collection.findOne({ _id: id}) as JobData;
    if(job && !job.events.find(existingEvent => existingEvent.status === event.status)) {
      const updatedEvents = job.events.concat(event);
      const result = await collection.updateOne({ _id: id}, { $set: { events: updatedEvents } })
      await client.close();
      return result;
    } else {
      await client.close();
      throw new Error('Job does not exist or event has been already created.');
    }
  } else {
    throw new Error("No key for the collection was received from the environment.")
  }
}

export const POST = async (req: Request, res: Response) => {
  try {
    const {event, jobId} = await req.json() as {event: EventData, jobId: ObjectId};
    const postStatus = await postEvent(event, jobId);
    return NextResponse.json(postStatus, {status:201})
  } catch (error) {
    return NextResponse.json({message: "Error", error},
    {status: 500})
  }
}