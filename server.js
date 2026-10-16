const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Define Mongoose Booking Schema
const bookingSchema = new mongoose.Schema({
  tripType: { type: String },
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  car: { type: String, required: true },
  travelDate: { type: String },
  pickupTime: { type: String },
  price: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// 2. Create Booking Model
const Booking = mongoose.model('Booking', bookingSchema);

// Basic Route
app.get('/', (req, res) => {
  res.send('Union Taxi Backend API is running...');
});

// 3. Booking API Endpoint (Saves to Database)
app.post('/api/bookings', async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Save to MongoDB using Mongoose model
    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save();

    console.log('Saved booking to database:', savedBooking);

    res.status(201).json({ 
      message: 'Booking created successfully', 
      data: savedBooking 
    });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Database Connection & Server Start
const MONGO_URI = process.env.MONGO_URI || '';

if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));
} else {
  console.warn('Warning: MONGO_URI is not defined in environment variables.');
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});