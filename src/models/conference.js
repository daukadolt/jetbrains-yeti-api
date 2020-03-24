const mongoose = require('mongoose');
const validator = require('validator');

const ConferenceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    projects: [String],
    location: {
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    tags: [String],
    dateStart: {
        type: Date,
        required: true,
    },
    dateFinish: {
        type: Date,
        required: true,
    },
    participants: { type: mongoose.Schema.Types.Mixed, default: {} },
    ytLink: {
        type: String,
        validate(url) {
            return new RegExp('(http|https):\\/\\/youtrack\\.jetbrains\\.com\\/issue\\/.+-.+').test(url);
        },
    },
    attendance: Number,
    link: {
        type: String,
        validate(url) {
            return validator.isURL(url);
        },
    },
    comments: [String],
    status: {
        type: String,
        enum: ['ACCEPTED', 'PROPOSED', 'REJECTED'],
        required: true,
    },
}, { minimize: false });

const Model = mongoose.model('Conferences', ConferenceSchema);

module.exports = {
    Model,
};
