import moment from "moment";
import { Id } from "./server-lib";
import { SettingsModel } from "./providers/context";
import { ObjectId } from "mongodb";

export function getMomentFormatted(){
  return `${moment().format('dddd')} ${moment().format('Do')} ${moment().format('MMMM')} ${moment().format('h:mm:ss a')}`;
}

export interface UserData {
  key: string,
  name: string,
  email: string,
  password: string,
  settings: SettingsModel
}

export interface JobData {
  _id: Id,      
  key: string;
  company: string;
  events: Array<EventData>;
  role?: string;
  exp?: number;
  candidacies?: number;

  fav?: boolean;
  provider?: string;
}

export enum JobInput {
  _id = "_id",
  key = "key",
  company = "company",
  events = "events",
  role = "role",
  exp = "exp",
  candidacies = "candidacies",
  fav = "fav",
  provider = "provider",
}

export interface EventData {
  status: JobStatus;
  time: Date;
  notes?: string;
  signature?: ObjectId;
}

export enum JobStatus {
  new = "new",
  applied = "applied",
  interview = "interview",
  offer = "offer",
  rejected = "rejected",
}