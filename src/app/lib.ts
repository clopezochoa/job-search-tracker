import moment from "moment";

export function getMomentFormatted(){
  return `${moment().format('dddd')} ${moment().format('Do')} ${moment().format('MMMM')} ${moment().format('h:mm:ss a')}`;
} 