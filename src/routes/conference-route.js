const express = require('express');
const { conferenceController } = require('../controllers/index');

const router = express.Router();

router.get('/all', conferenceController.getAllConferences);

router.post('/new', conferenceController.createNewConference);

module.exports = router;
