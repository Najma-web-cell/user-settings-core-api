const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // JSON parsing
app.use(requestLogger); // Custom logger

// Routes
app.use('/api/settings', settingsRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'User Settings API is running perfectly.' });
});

// Centralized Error Handler (Must be last)
app.use(errorHandler);

module.exports = app;