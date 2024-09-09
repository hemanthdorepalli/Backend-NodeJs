//Models/Session.ts
import mongoose, { Schema, Document } from 'mongoose';

interface Session extends Document {
  user: string;
  start: Date;
  end: Date;
  duration: number;
}

const SessionSchema: Schema = new Schema({
  user: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  duration: { type: Number, required: true }
});

export default mongoose.model<Session>('Session', SessionSchema);
