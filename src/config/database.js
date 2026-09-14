const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = process.env.DATABASE_URL
? new Sequelize(process.env.DATABASE_URL, {
dialect: 'postgres',
logging: process.env.NODE_ENV === 'development' ? console.log : false,
})
: new Sequelize(
process.env.PGDATABASE || 'ticketflow',
process.env.PGUSER || 'postgres',
process.env.PGPASSWORD || 'postgres',
{
host: process.env.PGHOST || 'localhost',
port: Number(process.env.PGPORT) || 5432,
dialect: 'postgres',
logging: process.env.NODE_ENV === 'development' ? console.log : false,
}
);
async function testConnection() {
  await sequelize.authenticate();
  return true;
}
module.exports = { sequelize, testConnection };