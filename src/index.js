const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;
const app = express();

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = '27017';
const DB_HOST = 'mongo';
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose.connect(URI)
        .then(() => console.log('DB is connect'))
        .catch((err) => console.log('Failed to connect to db', err));

app.get('/', (req, res) => res.send('<h1> Hello Ali Nasser, swe</h1>'))
app.listen(PORT, () => console.log('app is running'));