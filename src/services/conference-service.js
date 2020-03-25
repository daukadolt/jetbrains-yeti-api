const { Conference } = require('../models/index');

const getAllConferences = async () => Conference.Model.find({});

const createNewConference = async (conferenceData) => {
    const newConference = new Conference.Model(conferenceData);
    return newConference.save({ checkKeys: false });
};

module.exports = {
    getAllConferences,
    createNewConference,
};
