import { NextFunction, Request, Response } from "express";
import { endOfDay, parse, startOfDay } from "date-fns";

import { Resource, IResource } from "@app/models/Resource";
import { Booking, IBooking } from "@app/models/Booking";
import { BookingService } from "@app/services/booking";
import { ResourceService } from "@app/services/resource";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resource = new Resource({
      name: req.body.name,
      slots: []
    });
    await resource.save();

    return res.send({
      success: true,
      message: 'Created new Resource'
    });
  } catch (error) {
    next(error);
  }
};

export const getAvailability = (req: Request, res: Response) => {
  try {
    const { query, params } = req;

    const slotMinutes = Number(query.slotMinutes);
    const maxOverlaps = Number(query.maxOverlaps);
    const slotGrid = Number(query.slotGrid);

    const minDate = parse(query.minDate as string, 'dd-MM-yyyy', new Date());
    const maxDate = parse(query.maxDate as string, 'dd-MM-yyyy', new Date());

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
          slotMinutes,
          maxDate,
          bookings,
          maxOverlaps,
          slotGrid,
          shiftConfigs: BookingService.parseShift(activeShift),
        });

        res.send({ success: true, availabilities })
      })

  } catch (error) {
    res.send({ success: false, message: error })
  }
};


export const createBulk = (resources: IResource[]) => {
  try {
    return Resource.insertMany(resources);
  } catch (error) {
  }
};

export default {
  create,
  createBulk,
  getAvailability
};
