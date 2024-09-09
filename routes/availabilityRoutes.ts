//routes/availabilityRoutes
import express, { Request, Response } from 'express';
import SlotModel from '../models/Slot';

const router = express.Router();

// POST endpoint to add a slot
router.post('/slots', async (req: Request, res: Response) => {
  const { start, end, duration, user } = req.body;

  if (!start || !end || !duration || !user) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newSlot = new SlotModel({ start, end, duration, user });
    await newSlot.save();
    res.status(201).json(newSlot);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET endpoint to fetch availability by user
router.get('/slots', async (req: Request, res: Response) => {
  const user = req.query.user as string;

  if (!user) {
    return res.status(400).json({ error: 'User is required' });
  }

  try {
    const slots = await SlotModel.find({ user });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT endpoint to update a slot by ID
router.put('/slots/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { start, end, duration } = req.body;

  if (!start || !end || !duration) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const updatedSlot = await SlotModel.findByIdAndUpdate(
      id,
      { start, end, duration },
      { new: true }
    );

    if (!updatedSlot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    res.json(updatedSlot);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE endpoint to delete a slot by ID
router.delete('/slots/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedSlot = await SlotModel.findByIdAndDelete(id);

    if (!deletedSlot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    res.json({ message: 'Slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
