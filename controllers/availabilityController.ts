//controllers/availabilityController.ts
import { Request, Response } from 'express';
import Availability from '../models/Availability'; // Make sure you have a model for Availability

export const addAvailability = async (req: Request, res: Response) => {
  const { start, end, duration, user } = req.body;

  try {
    const newSlot = new Availability({
      start,
      end,
      duration,
      user
    });

    await newSlot.save();
    res.status(201).json(newSlot);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAvailability = async (req: Request, res: Response) => {
  const { user } = req.query;

  try {
    const slots = await Availability.find({ user });
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
