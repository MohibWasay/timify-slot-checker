import { IResourceShift } from "@app/models/Resource";
import { startOfDay, addHours, addMinutes } from "date-fns";

export interface IShiftConfigs {
  beginHour: number;
  beginMinute: number;
  untilHour: number;
  untilMinute: number;
}

const parseShift = (shift: IResourceShift): IShiftConfigs => {
  const [beginHour, beginMinute] = shift.begin.split(':').map(Number);
  const [untilHour, untilMinute] = shift.until.split(':').map(Number);

  return { beginHour, beginMinute, untilHour, untilMinute };
};

const getBeginAndUntilTime = (orignalDate: Date, shiftConfigs: IShiftConfigs): [Date, Date] => {
  const { beginHour, beginMinute, untilHour, untilMinute } = shiftConfigs;
  const date: Date = startOfDay(orignalDate);
  const beginTime: Date = addMinutes(addHours(date, beginHour), beginMinute);
  const untilTime: Date = addMinutes(addHours(date, untilHour), untilMinute);

  return [beginTime, untilTime];
};

export const BookingService = {
  parseShift,
  getBeginAndUntilTime
};
