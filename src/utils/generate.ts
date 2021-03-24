import fs from 'fs';
import { addHours, addMinutes, isBefore, startOfDay } from 'date-fns';

import { IResource } from '@app/models/Resource';
import { IBooking } from '@app/models/Booking';
import { SlotGrid } from '@app/utils/constant';
import { RandomGenerator } from '@app/utils/random';
import { isBetween } from '@app/utils/datetime';

import { createBulk as createBulkResources } from "@app/controllers/resource";
import { createBulk as createBulkEvents } from "@app/controllers/booking";
import { BookingService } from '@app/services/booking';

const path: string = `${process.cwd()}/mocks`;

const generateBulkEvents = (resources: IResource[]) => {
  resources.forEach(async ({ _id: resourceId, shifts }) => {
    const shiftConfigs = BookingService.parseShift(shifts.find(({ active }) => active));

    const bookings: IBooking[] = [];
    const counter = RandomGenerator.number(60, 75);
    let attempt = 0;

    while (bookings.length < counter || attempt > counter * 5) {
      // randomly generate grid slot using Slot grid enums [5, 10, 15, 30, 60].
      const date: Date = RandomGenerator.date();
      const slot: number = RandomGenerator.enum(SlotGrid);
      const [beginTime, untilTime] = BookingService.getBeginAndUntilTime(date, shiftConfigs);

      const start = RandomGenerator.randomDateInRange({
        begin: beginTime,
        until: untilTime,
        slot: SlotGrid.FIVE
      });

      const end = addMinutes(start, slot);

      const overlappingBooking: IBooking = bookings.find(
        (booking) => (
          isBetween(start, [booking.start, booking.end]) ||
          isBetween(end, [booking.start, booking.end])
        )
      );

      if (!overlappingBooking && isBefore(end, untilTime)) {
        bookings.push({ start, end, resourceId });
      }
      attempt++;
    }
    await createBulkEvents(bookings);
  });
}

export const prepopulateData = () => {
  fs.readFile(`${path}/resources.json`, 'utf8', (err: Error, content: BufferEncoding) => {
    if (!err) {
      const resources: IResource[] = JSON.parse(content).data;
      createBulkResources(resources)
        .then(generateBulkEvents);
    }
  });
}