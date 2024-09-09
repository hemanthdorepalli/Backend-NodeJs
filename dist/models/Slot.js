"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//models/Slot.ts
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema for the Slot model
const slotSchema = new mongoose_1.default.Schema({
    user: { type: String, required: true }, // Match field name with Slot interface
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    duration: { type: Number, required: true },
    // other fields
});
// Create the Slot model based on the schema and interface
const SlotModel = mongoose_1.default.model('Slot', slotSchema);
exports.default = SlotModel;
