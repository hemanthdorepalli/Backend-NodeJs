import mongoose, { Document, ObjectId, Schema } from 'mongoose';

// Define the Slot interface extending Document
interface Slot extends Document {
  _id: ObjectId;
  start: Date;   // Change from string to Date type
  end: Date;     // Change from string to Date type
  duration: number;
  user: string;  // Changed field name to match schema
}

// Define the schema for the Slot model
const slotSchema: Schema = new mongoose.Schema({
  user : { type: String, required: true }, // Match field name with Slot interface
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  duration: { type: Number, required: true },
  // other fields
});

// Create the Slot model based on the schema and interface
const SlotModel = mongoose.model<Slot>('Slot', slotSchema);

export default SlotModel;
