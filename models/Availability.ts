import mongoose, { Document, Schema } from 'mongoose';

interface IAvailability extends Document {
  start: Date;
  end: Date;
  duration: number;
  user: string;
}

const AvailabilitySchema: Schema = new Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  duration: { type: Number, required: true },
  user: { type: String, required: true }
});

export default mongoose.model<IAvailability>('Availability', AvailabilitySchema);
