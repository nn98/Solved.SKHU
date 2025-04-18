// controllers/algorithmController.js
const AlgorithmModel = require('../models/algorithmModel');

const AlgorithmController = {
    getMax: async (req, res) => {
        try {
            const results = await AlgorithmModel.getMaxProblems(req.mysql);
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getMin: async (req, res) => {
        try {
            const results = await AlgorithmModel.getMinProblems(req.mysql);
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getBest: async (req, res) => {
        try {
            const results = await AlgorithmModel.getBestProblems(req.mysql);
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getWorst: async (req, res) => {
        try {
            const results = await AlgorithmModel.getWorstProblems(req.mysql);
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = AlgorithmController;
