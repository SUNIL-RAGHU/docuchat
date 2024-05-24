// /src/config/postgresConfig.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:mysecretpassword@localhost:5432/postgres');

module.exports = sequelize;

