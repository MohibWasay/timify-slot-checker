import { Request, Response } from "express";
import { endOfDay, parse, startOfDay } from "date-fns";

import { Booking, IBooking } from "@app/models/Booking";
import Resource, { IResource } from "@app/models/Resource";
import { BookingService } from "@app/services/booking";
import { ResourceService } from "@app/services/resource";

export const createBulk = (events: IBooking[]) => {
  try {
    return Booking.insertMany(events);
  } catch (error) {
  }
};

export const getAvailability = (req: Request, res: Response) => {
  try {
    const { query, params } = req;

    const slotMinutes: number = Number(query.slotMinutes);
    const maxOverlaps: number = Number(query.maxOverlaps);
    const minDate: Date = parse(query.minDate as string, 'dd-MM-yyyy', new Date());
    const maxDate: Date = parse(query.maxDate as string, 'dd-MM-yyyy', new Date());
    const slotGrid: number = Number(query.slotGrid);
    
    Promise.all([
      Resource.findById(params.id),
      Booking.find({
        start: { $gte: startOfDay(minDate) },
        end: { $lte: endOfDay(maxDate) },
        resourceId: { $eq: params.id },
      })
    ])
      .then(([resource, bookings]: [IResource, IBooking[]]) => {
        const activeShift = resource.shifts.find(({ active }) => !!active);

        const availabilities: Date[] = ResourceService.getAvailability({
          minDate,
          maxDate,
          bookings,
          slotMinutes,
          maxOverlaps,
          slotGrid,
          shiftConfigs: BookingService.parseShift(activeShift),
        });

        res.send({
          success: true,
          availabilities
        })
      })

  } catch (error) {

  }
};

export default {
  createBulk,
  getAvailability
};
