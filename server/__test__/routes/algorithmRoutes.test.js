const request = require('supertest');
const express = require('express');
const algorithmRouter = require('../../routes/algorithm');
const AlgorithmController = require('../../controllers/algorithmController');

// Controller 메서드 mock
jest.mock('../../controllers/algorithmController', () => ({
    getMaxAlgorithm: jest.fn((req, res) => res.json([{ foo: 'bar' }])),
    getMinAlgorithm: jest.fn((req, res) => res.json([{ foo: 'baz' }])),
    getBestAlgorithm: jest.fn((req, res) => res.json([{ foo: 'best' }])),
    getWorstAlgorithm: jest.fn((req, res) => res.json([{ foo: 'worst' }])),
}));

// Express app에 라우터 장착
const app = express();
app.use(express.json());
app.use('/algorithm', algorithmRouter);

describe('Algorithm Routes', () => {
    it('GET /algorithm/max', async () => {
        const res = await request(app).get('/algorithm/max');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ foo: 'bar' }]);
        expect(AlgorithmController.getMaxAlgorithm).toHaveBeenCalled();
    });

    it('GET /algorithm/min', async () => {
        const res = await request(app).get('/algorithm/min');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ foo: 'baz' }]);
        expect(AlgorithmController.getMinAlgorithm).toHaveBeenCalled();
    });

    it('GET /algorithm/best', async () => {
        const res = await request(app).get('/algorithm/best');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ foo: 'best' }]);
        expect(AlgorithmController.getBestAlgorithm).toHaveBeenCalled();
    });

    it('GET /algorithm/worst', async () => {
        const res = await request(app).get('/algorithm/worst');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ foo: 'worst' }]);
        expect(AlgorithmController.getWorstAlgorithm).toHaveBeenCalled();
    });
});
