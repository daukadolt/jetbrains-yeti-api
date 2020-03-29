const { conferenceService } = require('../services/index');

const { ValidationError, DuplicateKeyError } = require('../errors/index');

const getAllConferences = async (req, res) => {
    try {
        const allConferences = await conferenceService.getAllConferences();
        return res.json(allConferences);
    } catch (e) {
        return res.sendStatus(500);
    }
};

const createNewConference = async (req, res) => {
    try {
        const conferenceData = req.body;
        await conferenceService.createNewConference(conferenceData);
        return res.sendStatus(200);
    } catch (e) {
        if (e instanceof ValidationError) {
            return res.status(400).send(e.message);
        }
        if (e instanceof DuplicateKeyError) {
            return res.status(400).send(e.message);
        }
        return res.sendStatus(500);
    }
};

const searchConference = async (req, res) => {
    try {
        return res.json(await conferenceService.searchConference(req.body));
    } catch (e) {
        return res.sendStatus(500);
    }
};

module.exports = {
    getAllConferences,
    createNewConference,
    searchConference,
};
