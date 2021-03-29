import { Booking, IBooking } from "@app/models/Booking";

export const createBulk = (events: IBooking[]) => {
  try {
    return Booking.insertMany(events);
  } catch (error) {
  }
};

export default {
  createBulk
};
