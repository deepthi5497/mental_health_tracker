const { sequelize, User, DailyLog } = require('../src/models');

async function viewData() {
  try {
    console.log('\n--- Users ---');
    const users = await User.findAll({
      attributes: ['id', 'username', 'createdAt']
    });
    console.table(users.map(u => u.toJSON()));

    console.log('\n--- Daily Logs ---');
    const logs = await DailyLog.findAll({
      include: [{
        model: User,
        attributes: ['username']
      }]
    });
    console.table(logs.map(log => ({
      id: log.id,
      username: log.User.username,
      date: log.date,
      mood: log.mood,
      anxietyLevel: log.anxietyLevel,
      sleepHours: log.sleepHours,
      symptoms: log.symptoms
    })));

    await sequelize.close();
  } catch (error) {
    console.error('Error viewing data:', error);
  }
}

viewData();
