// src/server.js
const express = require('express');
const cors = require('cors');
const { sequelize, User, DailyLog } = require('./models');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/logs', require('./routes/logs'));

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;

// Function to create test data
const createTestData = async () => {
  try {
    // Create a test user
    const testUser = await User.create({
      username: 'testuser',
      password: 'password123'
    });
    console.log('Test user created:', testUser.username);

    // Create some test logs
    const testLogs = await DailyLog.create({
      userId: testUser.id,
      mood: 7,
      anxietyLevel: 3,
      sleepHours: 8,
      sleepQuality: 4,
      physicalActivity: 'moderate',
      socialInteractions: 5,
      stressLevel: 4,
      symptoms: JSON.stringify(['Fatigue'])
    });
    console.log('Test logs created');

    return { testUser, testLogs };
  } catch (error) {
    console.error('Error creating test data:', error);
  }
};

// Function to find an available port
const findAvailablePort = async (startPort) => {
  let port = startPort;
  while (port < startPort + 10) {
    try {
      await new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
          server.close();
          resolve();
        });
        server.on('error', reject);
      });
      return port;
    } catch (err) {
      if (err.code === 'EADDRINUSE') {
        port++;
        continue;
      }
      throw err;
    }
  }
  throw new Error('No available ports found');
};

// Initialize database and start server
const initializeServer = async () => {
  try {
    // Sync database with force option to recreate tables
    await sequelize.sync({ force: true });
    console.log('Database synced and tables created');

    // Create test data
    await createTestData();
    console.log('Test data initialized');

    // Start the server
    const availablePort = await findAvailablePort(PORT);
    app.listen(availablePort, () => {
      console.log(`Server running on port ${availablePort}`);
    });
  } catch (error) {
    console.error('Server initialization error:', error);
    process.exit(1);
  }
};

// Start the server
initializeServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});