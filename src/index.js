// const mongoose = require('mongoose');
const express = require('express');
const {Client} = require('pg');
const redis = require('redis');

const PORT = process.env.PORT || 4000;
const app = express();

// connecting with redisDb
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error', (err) => console.log('Failed to connect to redis', err));
redisClient.on('connect', () => console.log('connected to redis'));
redisClient.connect();

// connecting with postgres
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = '5432';
const DB_HOST = 'postgres';
const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const client = new Client({
   connectionString: URI
});
client.connect(URI)
        .then(() => console.log('postgresDb is connect'))
        .catch((err) => console.log('Failed to connect to postgresDb', err));


// connecting with mongoDb
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = '27017';
// const DB_HOST = 'mongo';
// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose.connect(URI)
//         .then(() => console.log('mongoDb is connect'))
//         .catch((err) => console.log('Failed to connect to mongoDb', err));

// enpoints
app.get('/', (req, res) => {
    redisClient.set("Cached", "Yes Cached...");
    res.send('<h1> Hello Ali Nasser, swe</h1>');
});

app.get('/data', async (req, res) => {
    const data = await redisClient.get("Cached");
    res.send(`<h1> Hello Ali Nasser </h1> <h2> ${data} </h2>`);
});
app.listen(PORT, () => console.log('app is running'));