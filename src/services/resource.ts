import { IBooking } from "@app/models/Booking";
import { BookingService, IShiftConfigs } from "@app/services/booking";
import { SlotGrid } from "@app/utils/constant";
import { updateTime } from "@app/utils/datetime";
import { startOfDay } from "date-fns";
import isBefore from "date-fns/isBefore";

const getAvailability = (props: {
  minDate: Date;
  maxDate: Date;
  shiftConfigs: IShiftConfigs;
  slotMinutes: number;
  maxOverlaps: number;
  slotGrid: SlotGrid;
  bookings: IBooking[];
}): Date[] => {
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

  const beginningTime: Date = updateTime(startOfDay(minDate), {
    hours: beginHour,
    minutes: beginMinute
  });

  const completionTime: Date = updateTime(startOfDay(maxDate), {
    hours: untilHour,
    minutes: untilMinute
  });

  let time: Date = new Date(beginningTime.getTime());

  while (isBefore(time, completionTime)) {
    const endTime = updateTime(time, { minutes: slotMinutes });
    const hasOverlap: boolean = BookingService.hasOverlap(time, endTime, bookings, maxOverlaps);

    if (!hasOverlap) {
      availabilities.push(time);
    }

    time = updateTime(time, { minutes: slotGrid });
    if (BookingService.isLastAvailableTime(time, { untilHour, untilMinute })) {
      time = updateTime(startOfDay(time), {
        days: 1,
        hours: beginHour,
        minutes: beginMinute
      });
    }
  }
  return availabilities;
};

export const ResourceService = {
  getAvailability
};
