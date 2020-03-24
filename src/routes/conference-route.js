const express = require('express');
const { Conference } = require('../models/index');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allConferences = await Conference.Model.find({});
        return res.json(allConferences);
    } catch (e) {
        return res.sendStatus(500);
    }
});

module.exports = router;
