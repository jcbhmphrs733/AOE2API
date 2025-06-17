//required packages
const request = require('supertest');
const express = require('express');
const civRouter = require('../routes/civ');
const mongodb = require('../data/database');

const app = express();
app.use(express.json());
app.use('/civs', civRouter);

//initialize the database
beforeAll((done) => {
  mongodb.initDb((err) => {
    if (err) return done(err);
    done();
  });
});

// The test cases
describe('civs', function () {
    
    test('GET /civs', async () => {
        const res = await request(app).get('/civs');
        expect(res.statusCode).toBe(200);
    });

    test('GET /civs/:id', async () => {
        const id = '6843c18123054ad2bb126152';
        const res = await request(app).get(`/civs/${id}`);
        expect(res.statusCode).toBe(200);
    });
});