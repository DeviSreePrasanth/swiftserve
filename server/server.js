const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoute');
const serviceRoutes = require('./routes/serviceRoute');
const searchRoute = require('./routes/searchRoute');
const vendorRoutes = require('./routes/vendorRoute');
const cartRoute = require('./routes/cartRoutes');
const bookingRoute = require('./routes/bookingsRoutes');
const detailRoute = require('./routes/detailRoute');
const reviewRoutes = require('./routes/reviewRoute');
const fullRoute = require('./routes/fullRoute');
const db = require('./config/connectDB');
const app = express();
const allowedOrigins = [
  'https://swiftserve-4v01.onrender.com', // Production frontend
  'http://localhost:5173', // Development frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  })
);

app.use(express.json());
dotenv.config();
db();

app.use('/auth', authRoutes);
app.use('/service', serviceRoutes);
app.use('/search', searchRoute);
app.use('/vendor', vendorRoutes);
app.use('/review', reviewRoutes);
app.use('/cart', cartRoute);
app.use('/bookings', bookingRoute);
app.use('/detail', detailRoute);
app.use('/vendor-service', fullRoute);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});
