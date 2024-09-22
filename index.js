// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const scanRoutes = require('./routes/scanRoutes');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/scans', scanRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Nutrition App Backend is Running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
