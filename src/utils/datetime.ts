import { addMinutes } from "date-fns";
import addHours from "date-fns/addHours";

interface TimeOptions {
  hours?: number,
  minutes?: number
};

export const isBetween = (date: Date, [start, end]: Date[]): boolean => {
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
};

export const updateTime = (date: Date, options: TimeOptions) => {
  let updatedDate = new Date(date.getTime());
  
  updatedDate = options.hours ? addHours(updatedDate, options.hours) : updatedDate;
  updatedDate = options.minutes ? addMinutes(updatedDate, options.minutes) : updatedDate;

  return updatedDate;
}