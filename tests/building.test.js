const request = require('supertest');
const express = require('express');
const buildingRouter = require('../routes/building');
const mongodb = require('../data/database');

// Mock authentication middleware to always allow
jest.mock('../middleware/authenticate', () => ({
  isAuthenticated: (req, res, next) => next(),
}));

const app = express();
app.use(express.json());
app.use('/buildings', buildingRouter);

beforeAll((done) => {
  mongodb.initDb((err) => {
    if (err) return done(err);
    done();
  });
});

describe('All buildings', () => {
  describe('GET /buildings', () => {
    it('should return all buildings', async () => {
      const res = await request(app).get('/buildings');
      expect(200).toContain(res.statusCode);
    });
  });

  describe('GET /buildings/:id', () => {
    it('should return a single building', async () => {
        const id = '6843c12323054ad2bb12614c';
        const res = await request(app).get(`/buildings/${id}`);
        expect(200).toContain(res.statusCode);
    });
  });
});

describe('buildings')