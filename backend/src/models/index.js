const sequelize = require('../config/database');
const User = require('./User');
const DailyLog = require('./DailyLog');

// Define relationships
User.hasMany(DailyLog, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
DailyLog.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = {
  sequelize,
  User,
  DailyLog
};