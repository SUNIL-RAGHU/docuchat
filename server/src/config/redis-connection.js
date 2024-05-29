const Redis = require('ioredis');

// Retrieve Redis connection details from environment variables
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

// Create a Redis connection instance using ioredis
const connection = new Redis({
  host: redisHost,
  port: redisPort
});

connection.on('connect', () => {
  console.log('Connected to Redis');
});

connection.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = connection;
