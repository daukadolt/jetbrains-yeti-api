const express = require('express');

const conferenceRoute = require('./conference-route');

const router = express.Router();

router.use('/conference', conferenceRoute);

module.exports = router;
