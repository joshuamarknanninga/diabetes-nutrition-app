// index.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const scanRoutes = require('./routes/scanRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/scans', scanRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Nutrition App API is running.');
});

// Error Handling for Unknown Routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
