const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Union Taxi Backend API is running...');
});

// Example Booking API Endpoint
app.post('/api/bookings', async (req, res) => {
  try {
    const bookingData = req.body;
    // Add logic here to save bookingData to MongoDB using Mongoose
    res.status(201).json({ message: 'Booking created successfully', data: bookingData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Database Connection & Server Start
const MONGO_URI = process.env.MONGO_URI || '';

if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});