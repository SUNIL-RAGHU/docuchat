const express = require('express');
const app = express();
const projectController = require('./controllers/projectController');
const errorHandler = require('./middlewares/errorHandler');

// Middlewares
app.use(express.json());

// Routes
app.use('/api/projects', projectController);

// Error handler
app.use(errorHandler);

module.exports = app;
