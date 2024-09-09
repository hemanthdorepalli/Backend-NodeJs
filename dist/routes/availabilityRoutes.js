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
//routes/availabilityRoutes
const express_1 = __importDefault(require("express"));
const Slot_1 = __importDefault(require("../models/Slot"));
const router = express_1.default.Router();
// POST endpoint to add a slot
router.post('/slots', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { start, end, duration, user } = req.body;
    if (!start || !end || !duration || !user) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const newSlot = new Slot_1.default({ start, end, duration, user });
        yield newSlot.save();
        res.status(201).json(newSlot);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// GET endpoint to fetch availability by user
router.get('/slots', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.query.user;
    if (!user) {
        return res.status(400).json({ error: 'User is required' });
    }
    try {
        const slots = yield Slot_1.default.find({ user });
        res.json(slots);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// PUT endpoint to update a slot by ID
router.put('/slots/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { start, end, duration } = req.body;
    if (!start || !end || !duration) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const updatedSlot = yield Slot_1.default.findByIdAndUpdate(id, { start, end, duration }, { new: true });
        if (!updatedSlot) {
            return res.status(404).json({ error: 'Slot not found' });
        }
        res.json(updatedSlot);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// DELETE endpoint to delete a slot by ID
router.delete('/slots/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedSlot = yield Slot_1.default.findByIdAndDelete(id);
        if (!deletedSlot) {
            return res.status(404).json({ error: 'Slot not found' });
        }
        res.json({ message: 'Slot deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
exports.default = router;
