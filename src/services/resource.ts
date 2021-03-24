import { IBooking } from "@app/models/Booking";
import { BookingService, IShiftConfigs } from "@app/services/booking";
import { SlotGrid } from "@app/utils/constant";
import { updateTime } from "@app/utils/datetime";
import { startOfDay } from "date-fns";
import isBefore from "date-fns/isBefore";

interface IGetAvailabilityProps {
  minDate: Date;
  maxDate: Date;
  shiftConfigs: IShiftConfigs;
  slotMinutes: number;
  maxOverlaps: number;
  slotGrid: SlotGrid;
  bookings: IBooking[];
}

const getAvailability = (props: IGetAvailabilityProps): Date[] => {
  const {
    minDate,
    maxDate,
    slotMinutes,
    maxOverlaps,
    slotGrid,
    shiftConfigs: {
      beginHour,
      beginMinute,
      untilHour,
      untilMinute
    },
    bookings
  } = props;

  const availabilities: Date[] = [];

  const beginningTime: Date = startOfDay(updateTime(minDate, {
    hours: beginHour,
    minutes: beginMinute
  }));

  const completionTime: Date = startOfDay(updateTime(maxDate, {
    hours: untilHour,
    minutes: untilMinute
  }));

  let time: Date = new Date(beginningTime.getTime());

  while (isBefore(time, completionTime)) {
    const endTime = updateTime(time, { minutes: slotMinutes });
    if (!BookingService.hasOverlap(time, endTime, bookings, maxOverlaps)) {
      availabilities.push(time);
    }
    time = updateTime(time, { minutes: slotGrid });
  }
  return availabilities;
};

export const ResourceService = {
  getAvailability
};
