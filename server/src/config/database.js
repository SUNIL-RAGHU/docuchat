const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:mysecretpassword@localhost:5432/postgres', {
  dialect: 'postgres',
  logging: false, // Set to true to log SQL queries
});

module.exports = sequelize;