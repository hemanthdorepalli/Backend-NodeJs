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
exports.getAvailability = exports.addAvailability = void 0;
const Availability_1 = __importDefault(require("../models/Availability")); // Make sure you have a model for Availability
const addAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { start, end, duration, user } = req.body;
    try {
        const newSlot = new Availability_1.default({
            start,
            end,
            duration,
            user
        });
        yield newSlot.save();
        res.status(201).json(newSlot);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.addAvailability = addAvailability;
const getAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.query;
    try {
        const slots = yield Availability_1.default.find({ user });
        res.status(200).json(slots);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAvailability = getAvailability;
