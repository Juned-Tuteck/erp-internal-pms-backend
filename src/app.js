const express = require('express');
const cors = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes');

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', projectRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { status: 'Server is running' },
    clientMessage: 'Health check passed',
    devMessage: 'Server is operational'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    data: null,
    clientMessage: 'Route not found',
    devMessage: `Cannot ${req.method} ${req.path}`
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    statusCode: 500,
    data: null,
    clientMessage: 'Internal server error',
    devMessage: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api`);
});

module.exports = app;
