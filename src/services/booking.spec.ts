import { DatetimeService } from "@app/utils/datetime";
import startOfDay from "date-fns/startOfDay";

import { BookingService } from "./booking";

describe('BookingService', () => {
  const resourceShift = {
    active: true,
    begin: '08:00',
    until: '16:45'
  };

  const shiftConfigs = {
    beginHour: 8,
    beginMinute: 0,
    untilHour: 16,
    untilMinute: 45,
  };

  it('erwarten Sie, dass die analysierte Verschiebung einen relevanten Beginn und bis zur Zeit hat', () => {
    expect(BookingService.parseShift(resourceShift))
      .toMatchObject(shiftConfigs);
  });

  it('erwarten Sie, dass die analysierte Verschiebung einen relevanten Beginn und bis zur Zeit hat', () => {
    expect(BookingService.getDuration(new Date(), shiftConfigs))
      .toMatchObject([
        DatetimeService.updateTime(startOfDay(new Date()), {
          hours: shiftConfigs.beginHour,
          minutes: shiftConfigs.beginMinute
        }),
        DatetimeService.updateTime(startOfDay(new Date()), {
          hours: shiftConfigs.untilHour,
          minutes: shiftConfigs.untilMinute
        })
      ]);
  });

  it('erwarten Sie, dass es eine letzte verfügbare Zeit für den Tag ist', () => {
    const date = new Date(2021, 3, 14, 16, 45);
    expect(BookingService.isLastAvailableTime(date, shiftConfigs)).toBe(true);
  });

  it('erwarten Sie, dass es eine letzte verfügbare Zeit für den Tag ist', () => {
    const [beginTime, untilTime] = [new Date(2020, 7, 16, 10, 30, 0), new Date(2020, 7, 16, 11, 30, 0)];
    const bookings = [
      {
        _id: '1',
        resourceId: '1',
        start: new Date(2020, 7, 16, 6, 45, 0),
        end: new Date(2020, 7, 16, 7, 0, 0)
      },
      {
        _id: '2',
        resourceId: '1',
        start: new Date(2020, 7, 16, 9, 45, 0),
        end: new Date(2020, 7, 16, 10, 15, 0)
      },
      {
        _id: '3',
        resourceId: '1',
        start: new Date(2020, 7, 16, 10, 15, 0),
        end: new Date(2020, 7, 16, 10, 30, 0)
      }
    ]

    expect(BookingService.hasOverlap(beginTime, untilTime, bookings)).toBe(false);
  });
});
