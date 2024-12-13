// src/routes/logs.js
const express = require('express');
const router = express.Router();
const { DailyLog, User, sequelize } = require('../models');
const auth = require('../middleware/auth');
const { Op } = require('sequelize');

// Create new log
router.post('/', auth, async (req, res) => {
  try {
    console.log('User ID:', req.user.id);
    console.log('Received log data:', req.body);

    // Validate required fields
    if (!req.body.mood || !req.body.anxietyLevel) {
      return res.status(400).json({ error: 'Mood and anxiety level are required' });
    }

    // Create the log
    const logData = {
      userId: req.user.id,
      mood: req.body.mood,
      anxietyLevel: req.body.anxietyLevel,
      sleepHours: req.body.sleepHours,
      sleepQuality: req.body.sleepQuality,
      physicalActivity: req.body.physicalActivity,
      socialInteractions: req.body.socialInteractions,
      stressLevel: req.body.stressLevel,
      symptoms: req.body.symptoms || [],
      date: new Date()
    };

    const log = await DailyLog.create(logData);
    console.log('Log created successfully:', log.toJSON());
    res.status(201).json(log);
  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({ 
      error: 'Failed to create log',
      details: error.message 
    });
  }
});

// Get user's logs
router.get('/', auth, async (req, res) => {
  try {
    console.log('Fetching logs for user:', req.user.id);
    const logs = await DailyLog.findAll({
      where: { userId: req.user.id },
      order: [['date', 'DESC']],
      raw: true
    });
    
    console.log('Found logs:', logs.length);
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// Get all logs (admin only)
router.get('/all', async (req, res) => {
  try {
    const logs = await DailyLog.findAll({
      include: [{
        model: User,
        attributes: ['username']
      }],
      order: [['date', 'DESC']]
    });
    res.json(logs);
  } catch (error) {
    console.error('Error fetching all logs:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// Get logs by date range
router.get('/range', auth, async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    const logs = await DailyLog.findAll({
      where: {
        userId: req.user.id,
        date: {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        }
      },
      order: [['date', 'DESC']]
    });
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs by range:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// Get summary statistics
router.get('/summary', auth, async (req, res) => {
  try {
    const summary = await DailyLog.findAll({
      where: {
        userId: req.user.id
      },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('mood')), 'averageMood'],
        [sequelize.fn('AVG', sequelize.col('anxietyLevel')), 'averageAnxiety'],
        [sequelize.fn('AVG', sequelize.col('sleepHours')), 'averageSleep'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalEntries']
      ],
      raw: true
    });
    res.json(summary[0]);
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

module.exports = router;