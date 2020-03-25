const { conferenceService } = require('../services/index');

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
        return res.sendStatus(500);
    }
};

module.exports = {
    getAllConferences,
    createNewConference,
};
