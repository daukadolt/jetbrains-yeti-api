const moment = require('moment');
const mongoose = require('mongoose');
const { Conference } = require('../models/index');

const { ObjectId } = mongoose.Types;

const getAllConferences = async () => Conference.Model.find({});

const createNewConference = async (conferenceData) => {
    const newConference = new Conference.Model(conferenceData);
    return newConference.save({ checkKeys: false });
};

const searchConference = async (conferenceData) => {
    const caseInsensitiveDotNotation = (conferenceObject) => {
        const resultingObject = {};
        Object.keys(conferenceObject).forEach((key) => {
            const field = conferenceObject[key];
            if (typeof field === 'string') {
                if (ObjectId.isValid(field)) {
                    resultingObject[key] = field;
                } else if (moment(field, 'YYYY-MM-DDThh:mm:ss.SSSZ', true).isValid()) {
                    /* field is a valid Date */
                    resultingObject[key] = conferenceObject[key];
                } else resultingObject[key] = { $regex: new RegExp(`${field}`, 'i') };
            } else if (field instanceof Array) {
                resultingObject[key] = field;
            } else if (typeof field === 'object') {
                const nestedObject = caseInsensitiveDotNotation(conferenceObject[key]);
                Object.keys(nestedObject).forEach((nestedKey) => {
                    resultingObject[`${key}.${nestedKey}`] = nestedObject[nestedKey];
                });
            } else {
                resultingObject[key] = conferenceObject[key];
            }
        });
        return resultingObject;
    };
    const searchFor = caseInsensitiveDotNotation(conferenceData);
    return Conference.Model.find(searchFor);
};

module.exports = {
    getAllConferences,
    createNewConference,
    searchConference,
};
