//required packages
const request = require('supertest');
const express = require('express');
const unitRouter = require('../routes/unit');
const mongodb = require('../data/database');

const app = express();
app.use(express.json());
app.use('/unit', unitRouter);

//initialize the database
beforeAll((done) => {
  mongodb.initDb((err) => {
    if (err) return done(err);
    done();
  });
});

// The test cases
describe('unit', function () {
    
    test('GET /unit', async () => {
        const res = await request(app).get('/unit');
        expect(res.statusCode).toBe(200);
    });

    test('GET /unit/:id', async () => {
        const id = '6850e4f2ef039b67be171395';
        const res = await request(app).get(`/unit/${id}`);
        expect(res.statusCode).toBe(200);
    });
});