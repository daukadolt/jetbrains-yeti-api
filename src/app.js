const express = require('express');

const app = express();

app.use(express.json());

const api = require('./routes/index');

app.get('/', (req, res) => { res.send('App is working!'); });

app.use('/api', api);

module.exports = app;
