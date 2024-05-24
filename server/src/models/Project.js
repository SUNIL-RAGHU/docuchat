const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgresConfig');

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pdfUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vectorEmbeddings: {
    type: DataTypes.JSONB, // Assuming vector embeddings are stored as JSONB
    allowNull: true,
  },
});

module.exports = Project;
