import moment from "moment";
import { Id } from "./server-lib";
import { SettingsModel } from "./providers/context";

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

export interface EventData {
  status: JobStatus;
  time: Date;
  notes?: string;
}

export enum JobStatus {
  potential = "potential",
  applied = "applied",
  interview = "interview",
  offer = "offer",
  rejected = "rejected",
}