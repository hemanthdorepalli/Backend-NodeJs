// //index.ts
// import express from 'express';
// import cors from 'cors'; // Import the cors package
// import connectDB from './config/db';
// import authRoutes from './routes/authRoutes';
// import availabilityRoutes from './routes/availabilityRoutes'; // Import availability routes
// import adminRoutes from './routes/adminRoutes'; // Import admin routes

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
import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import availabilityRoutes from './routes/availabilityRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5022',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type',
}));
app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/admin', adminRoutes);

// Start server
const PORT = process.env.PORT || 5021;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
