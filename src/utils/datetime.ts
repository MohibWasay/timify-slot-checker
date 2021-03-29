import { addDays, addMinutes, addHours } from "date-fns";

interface TimeOptions {
  days?: number;
  hours?: number,
  minutes?: number
};

export const isBetween = (date: Date, [start, end]: Date[]): boolean => {
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
};

export const updateTime = (date: Date, options: TimeOptions) => {
  let updatedDate = new Date(date.getTime());
  
  updatedDate = options.days ? addDays(updatedDate, options.days) : updatedDate;
  updatedDate = options.hours ? addHours(updatedDate, options.hours) : updatedDate;
  updatedDate = options.minutes ? addMinutes(updatedDate, options.minutes) : updatedDate;

  return updatedDate;
}