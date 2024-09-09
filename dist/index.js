"use strict";
// //index.ts
// import express from 'express';
// import cors from 'cors'; // Import the cors package
// import connectDB from './config/db';
// import authRoutes from './routes/authRoutes';
// import availabilityRoutes from './routes/availabilityRoutes'; // Import availability routes
// import adminRoutes from './routes/adminRoutes'; // Import admin routes
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// // Connect to MongoDB
// connectDB();
// // Middleware
// app.use(cors({
//   origin: 'http://localhost:5022', // Allow this origin
//   methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
//   allowedHeaders: 'Content-Type', // Allow these headers
// }));
// app.use(express.json()); // Parses JSON bodies
// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/availability', availabilityRoutes); // Use availability routes
// app.use('/api/admin', adminRoutes); // Use admin routes
// // Start server
// const PORT = process.env.PORT || 5021; // Ensure the port matches your backend setup
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const availabilityRoutes_1 = __importDefault(require("./routes/availabilityRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
// Connect to MongoDB
(0, db_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:5022',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type',
}));
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/availability', availabilityRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
// Start server
const PORT = process.env.PORT || 5021;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
