import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking {
  _id?: string;
  resourceId: string;
  start: Date;
  end: Date;
}

const BookingSchema: Schema = new Schema({
  resourceId: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  }
});

export const Booking = mongoose.model<IBooking & Document>('Booking', BookingSchema);
export default Booking;