//required packages
const request = require('supertest');
const express = require('express');
const buildingRouter = require('../routes/building');
const mongodb = require('../data/database');

const app = express();
app.use(express.json());
app.use('/buildings', buildingRouter);

//initialize the database
beforeAll((done) => {
  mongodb.initDb((err) => {
    if (err) return done(err);
    done();
  });
});

// The test cases
describe('buildings', function () {

    // Test for getting all buildings
    test('GET /buildings', async () => {
        const res = await request(app).get('/buildings');
        expect(res.statusCode).toBe(200);
    });

    // Test for getting a single building by ID
    test('GET /buildings/:id', async () => {
        const id = '6843c12323054ad2bb12614c';
        const res = await request(app).get(`/buildings/${id}`);
        expect(res.statusCode).toBe(200);
    });
});