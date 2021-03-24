import { IBooking } from "@app/models/Booking";
import { IShiftConfigs } from "@app/services/booking";
import { SlotGrid } from "@app/utils/constant";

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
    shiftConfigs,
    bookings
  } = props;

  console.log({
    minDate,
    maxDate,
    slotMinutes,
    maxOverlaps,
    slotGrid,
    shiftConfigs,
    bookings
  });
  return [];
};

export const ResourceService = {
  getAvailability
};
