const humps = require('humps');
const ProblemModel = require('../models/problemModel');

const ProblemController = {
    getMaxProblem: async (req, res) => {
        try {
            const results = await ProblemModel.getMaxProblems(req.mysql);
            res.json(humps.camelizeKeys(results));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getMinProblem: async (req, res) => {
        try {
            const results = await ProblemModel.getMinProblems(req.mysql);
            res.json(humps.camelizeKeys(results));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getBestProblem: async (req, res) => {
        try {
            const results = await ProblemModel.getBestProblems(req.mysql);
            res.json(humps.camelizeKeys(results));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getWorstProblem: async (req, res) => {
        try {
            const results = await ProblemModel.getWorstProblems(req.mysql);
            res.json(humps.camelizeKeys(results));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getRandomProblem: async (req, res) => {
        try {
            const result = await ProblemModel.getRandomProblem();
            res.json(humps.camelizeKeys(result));
        } catch (err) {
            console.error('error in RandomProblem/get', err);
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = ProblemController;
