require('dotenv').config();
const { sequelize, testConnection } = require('./config/database');
const Category = require('./models/category.model');
const Ticket = require('./models/ticket.model');
async function syncDatabase() {
  await testConnection();
  console.log('Connection established.');

  await sequelize.sync({ force: false });
  console.log('All models were synchronized successfully.');

  process.exit(0);
}
syncDatabase().catch((err) => {
  console.error('Failed to sync database:', err);
  process.exit(1);
});