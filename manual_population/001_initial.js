require('dotenv/config');

const mongoose = require('mongoose');
const { Conference } = require('../src/models/index');

const listOfConferences = require('./conferences.json');

mongoose.connect(process.env.MONGO_PROD_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        try {
            await Conference.Model.deleteMany({});
            await Promise.all(
                listOfConferences
                    .map(async (conference) => (new Conference.Model(conference))
                        .save({ checkKeys: false })),
            );
        } catch (e) {
            console.error('error occured', e);
            await Conference.Model.deleteMany({});
        }
        process.exit(0);
    })
    .catch((err) => {
        console.error('Error: mongoose could not connect');
        console.error(err);
        process.exit(-1);
    });
