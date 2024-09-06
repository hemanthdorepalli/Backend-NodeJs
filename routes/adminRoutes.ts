import express, { Request, Response } from 'express';
import UserModel from '../models/User'; // Ensure you have User model defined
import SlotModel from '../models/Slot'; // Ensure you have Slot model defined

const router = express.Router();

// GET endpoint to fetch all users for admin
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find(); // Fetch all users
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET endpoint to fetch availability by user email
router.get('/availability/:email', async (req: Request, res: Response) => {
  try {
    const slots = await SlotModel.find({ user: req.params.email });
    res.json(slots);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT endpoint to update a slot by its ID
router.put('/availability/:id', async (req: Request, res: Response) => {
  try {
    const { start, end, duration } = req.body;
    const updatedSlot = await SlotModel.findByIdAndUpdate(
      req.params.id,
      { start, end, duration },
      { new: true }
    );
    if (!updatedSlot) {
      return res.status(404).json({ error: 'Slot not found' });
    }
    res.json(updatedSlot);
  } catch (error) {
    console.error('Error updating slot:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE endpoint to delete a slot by its ID
router.delete('/availability/:id', async (req: Request, res: Response) => {
  try {
    const deletedSlot = await SlotModel.findByIdAndDelete(req.params.id);
    if (!deletedSlot) {
      return res.status(404).json({ error: 'Slot not found' });
    }
    res.json({ message: 'Slot deleted successfully' });
  } catch (error) {
    console.error('Error deleting slot:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;
