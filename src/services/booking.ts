import { IBooking } from "@app/models/Booking";
import { IResourceShift } from "@app/models/Resource";
import { isBetween, updateTime } from "@app/utils/datetime";
import { startOfDay, addHours, addMinutes } from "date-fns";

interface IShiftBeginConfigs {
  beginHour: number;
  beginMinute: number;
}

interface IShiftUntilConfigs {
  untilHour: number;
  untilMinute: number;
}

export interface IShiftConfigs extends IShiftBeginConfigs, IShiftUntilConfigs {}

const parseShift = (shift: IResourceShift): IShiftConfigs => {
  const [beginHour, beginMinute] = shift.begin.split(':').map(Number);
  const [untilHour, untilMinute] = shift.until.split(':').map(Number);

  return { beginHour, beginMinute, untilHour, untilMinute };
};

const getDuration = (orignalDate: Date, shiftConfigs: IShiftConfigs): [Date, Date] => {
  const { beginHour, beginMinute, untilHour, untilMinute } = shiftConfigs;
  const date: Date = startOfDay(orignalDate);
  const beginTime: Date = addMinutes(addHours(date, beginHour), beginMinute);
  const untilTime: Date = addMinutes(addHours(date, untilHour), untilMinute);

  return [beginTime, untilTime];
};

export const isLastAvailableSlot = (time: Date, shiftConfigs: IShiftUntilConfigs): boolean => {
  const lastAvailableTime = updateTime(startOfDay(time), {
    hours: shiftConfigs.untilHour,
    minutes: shiftConfigs.untilMinute
  });
  return lastAvailableTime.getTime() <= time.getTime();
}

export const hasOverlap = (
  beginTime: Date,
  untilTime: Date,
  bookings: IBooking[],
  minOverlaps: number = 1,
) => {
  return bookings.filter(
    (booking) => (
      isBetween(beginTime, [booking.start, booking.end]) ||
      isBetween(untilTime, [booking.start, booking.end]) ||
      isBetween(booking.start, [beginTime, untilTime]) ||
      isBetween(booking.end, [beginTime, untilTime])
    )
  ).length > minOverlaps - 1;
}

export const BookingService = {
  parseShift,
  getDuration,
  isLastAvailableSlot,
  hasOverlap
};
