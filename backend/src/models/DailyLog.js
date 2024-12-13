// src/models/DailyLog.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DailyLog = sequelize.define('DailyLog', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  mood: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  },
  anxietyLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  },
  sleepHours: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  sleepQuality: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  },
  physicalActivity: {
    type: DataTypes.STRING,
    allowNull: true
  },
  socialInteractions: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  stressLevel: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  symptoms: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const val = this.getDataValue('symptoms');
      return val ? JSON.parse(val) : [];
    },
    set(val) {
      this.setDataValue('symptoms', JSON.stringify(val));
    }
  }
}, {
  tableName: 'daily_logs',
  timestamps: true
});

module.exports = DailyLog;