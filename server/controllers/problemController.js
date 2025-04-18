const ProblemModel = require('../models/problemModel');

const ProblemController = {
    getMaxProblem: async (req, res) => {
        try {
            const results = await ProblemModel.getMaxProblems(req.mysql);
            res.json(results);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    },

    getMinProblem: async (req, res) => {
        try {
            const results = await ProblemModel.getMinProblems(req.mysql);
            res.json(results);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    },

    getBestProblem: async (req, res) => {
        try {
            const results = await ProblemModel.getBestProblems(req.mysql);
            res.json(results);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    },

    getWorstProblem: async (req, res) => {
        try {
            const results = await ProblemModel.getWorstProblems(req.mysql);
            res.json(results);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }
};

module.exports = ProblemController;