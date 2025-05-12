const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

// Static configuration
const ALLOWED_ORIGINS = ['http://localhost:5173', 'https://swiftserve-cags.vercel.app/'];
const PORT = 5000;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());

// Connect to MongoDB
db();

// Routes
app.use('/auth', authRoutes);
app.use('/service', serviceRoutes);
app.use('/search', searchRoute);
app.use('/vendor', vendorRoutes);
app.use('/review', reviewRoutes);
app.use('/cart', cartRoute);
app.use('/bookings', bookingRoute);
app.use('/detail', detailRoute);
app.use('/vendor-service', fullRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});