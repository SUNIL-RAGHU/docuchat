const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./Project');

const Embedding = sequelize.define('Embedding', {
    
  paragraph: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  embedding: {
    type: DataTypes.ARRAY(DataTypes.FLOAT), // Define an array of floats for embeddings
    allowNull: false,
  },
});

Embedding.belongsTo(Project, { foreignKey: 'projectId', onDelete: 'CASCADE' });

module.exports = Embedding;
