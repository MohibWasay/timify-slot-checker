import mongoose, { Schema, Document } from 'mongoose';

export interface IResourceShift {
  begin: string;
  until: string;
  active: boolean;
}

export interface IResource {
  _id?: string;
  name: string;
  shifts: IResourceShift[];
}

const ReourceSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  shifts: [{
    timezone: {
      type: String
    },
    begin: {
      type: String,
      required: true
    },
    until: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    }
  }]
});

export const Resource = mongoose.model<IResource & Document>('Resource', ReourceSchema);
export default Resource;