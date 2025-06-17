//required packages
const request = require('supertest');
const express = require('express');
const techRouter = require('../routes/tech');
const mongodb = require('../data/database');

const app = express();
app.use(express.json());
app.use('/tech', techRouter);

//initialize the database
beforeAll((done) => {
  mongodb.initDb((err) => {
    if (err) return done(err);
    done();
  });
});

// The test cases
describe('tech', function () {
    
    test('GET /tech', async () => {
        const res = await request(app).get('/tech');
        expect(res.statusCode).toBe(200);
    });

    test('GET /tech/:id', async () => {
        const id = '6850e4f2ef039b67be171395';
        const res = await request(app).get(`/tech/${id}`);
        expect(res.statusCode).toBe(200);
    });
});