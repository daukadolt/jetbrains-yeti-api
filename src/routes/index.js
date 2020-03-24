const express = require('express');

const conferenceRoute = require('./conference-route');

const router = express.Router();

router.use('/conferences', conferenceRoute);

module.exports = router;
