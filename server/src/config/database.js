const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USERNAME, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: process.env.DB_DIALECT,
  logging: process.env.DB_LOGGING === 'true', // Set to true to log SQL queries
});

module.exports = sequelize;
