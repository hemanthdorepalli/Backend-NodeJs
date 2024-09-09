"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//routes/adminRoutes.ts
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User")); // Ensure you have User model defined
const Slot_1 = __importDefault(require("../models/Slot")); // Ensure you have Slot model defined
const router = express_1.default.Router();
// GET endpoint to fetch all users for admin
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find(); // Fetch all users
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server error' });
    }
}));
// GET endpoint to fetch availability by user email
router.get('/availability/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slots = yield Slot_1.default.find({ user: req.params.email });
        res.json(slots);
    }
    catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ error: 'Server error' });
    }
}));
// PUT endpoint to update a slot by its ID
router.put('/availability/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { start, end, duration } = req.body;
        const updatedSlot = yield Slot_1.default.findByIdAndUpdate(req.params.id, { start, end, duration }, { new: true });
        if (!updatedSlot) {
            return res.status(404).json({ error: 'Slot not found' });
        }
        res.json(updatedSlot);
    }
    catch (error) {
        console.error('Error updating slot:', error);
        res.status(500).json({ error: 'Server error' });
    }
}));
// DELETE endpoint to delete a slot by its ID
router.delete('/availability/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedSlot = yield Slot_1.default.findByIdAndDelete(req.params.id);
        if (!deletedSlot) {
            return res.status(404).json({ error: 'Slot not found' });
        }
        res.json({ message: 'Slot deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting slot:', error);
        res.status(500).json({ error: 'Server error' });
    }
}));
exports.default = router;
