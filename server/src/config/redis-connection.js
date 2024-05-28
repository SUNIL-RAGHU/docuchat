const Redis = require('ioredis');
require('dotenv').config(); 

const redisConfig = {
  port: process.env.REDIS_PORT || 6379, 
  host: process.env.REDIS_HOST || 'redis'
};
const redisConnection = new Redis(redisConfig);

redisConnection.on('connect', () => {
  console.log('Connected to Redis');
});

redisConnection.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = redisConnection;
