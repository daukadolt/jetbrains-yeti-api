/* eslint-env node, jest */

require('dotenv/config');

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const { Conference } = require('../../models');
const listOfConferences = require('../../../manual_population/conferences.json');

describe('testing conference controller', () => {
    beforeAll(async (done) => {
        await mongoose.connect(process.env.MONGO_TEST_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        await Conference.Model.deleteMany({});
        done();
    });
    describe('testing new conference creation', () => {
        afterEach(async (done) => {
            await Conference.Model.deleteMany({});
            done();
        });
        test('submit valid information for conference', async (done) => {
            const payload = listOfConferences[0];
            const response = await request(app)
                .post('/api/conference/new')
                .send(payload);
            expect(response.statusCode).toEqual(200);
            done();
        });
        test('submit incomplete information for conference', async (done) => {
            const asyncForEach = async (array, callback) => {
                const asyncCallbacks = [];
                for (let index = 0; index < array.length; index += 1) {
                    asyncCallbacks.push(callback(array[index], index, array));
                }
                await Promise.all(asyncCallbacks);
            };
            const removeKey = (object, pathToKey) => {
                let currentObject = object;
                const keys = pathToKey.split('.');
                keys.forEach((key, index) => {
                    if (index !== keys.length - 1) currentObject = currentObject[key];
                });
                delete currentObject[keys[keys.length - 1]];
            };
            const deepCopy = (objectToCopy) => {
                if (!(objectToCopy instanceof Object)) return objectToCopy;
                if (objectToCopy instanceof Array) {
                    const newArray = [];
                    objectToCopy.forEach((item) => {
                        newArray.push(deepCopy(item));
                    });
                    return newArray;
                }
                const newObject = {};
                Object.keys(objectToCopy).forEach((key) => {
                    newObject[key] = deepCopy(objectToCopy[key]);
                });
                return newObject;
            };
            const payload = listOfConferences[0];
            const cases = {
                'no title': 'title',
                'no location.city': 'location.city',
                'no location.country': 'location.country',
                'no dateStart': 'dateStart',
                'no dateFinish': 'dateFinish',
                'no status': 'status',
            };
            await asyncForEach(Object.values(cases), async (missingField) => {
                const modifiedPayload = deepCopy(payload);
                removeKey(modifiedPayload, missingField);
                const response = await request(app)
                    .post('/api/conference/new')
                    .send(modifiedPayload);
                expect(response.statusCode).toEqual(400);
            });
            done();
        });
        test('submit empty object for conference', async (done) => {
            const payload = {};
            const response = await request(app)
                .post('/api/conference/new')
                .send(payload);
            expect(response.statusCode).toEqual(400);
            done();
        });
        test('submit object with duplicate _id', async (done) => {
            const firstPayload = listOfConferences[0];
            const secondPayload = listOfConferences[1];
            secondPayload._id = firstPayload._id;

            const firstResponse = await request(app)
                .post('/api/conference/new')
                .send(firstPayload);

            expect(firstResponse.statusCode).toEqual(200);

            const secondResponse = await request(app)
                .post('/api/conference/new')
                .send(secondPayload);

            expect(secondResponse.statusCode).toEqual(400);

            done();
        });
    });
});
