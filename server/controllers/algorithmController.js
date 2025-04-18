const AlgorithmModel = require('../models/algorithmModel');

const AlgorithmController = {
    getMax: (req, res) => {
        AlgorithmModel.getMaxProblems(req.mysql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "최다 해결 문제 조회 실패" });
            }
            res.json(result);
        });
    },

    getMin: (req, res) => {
        AlgorithmModel.getMinProblems(req.mysql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "최소 해결 문제 조회 실패" });
            }
            res.json(result);
        });
    },

    getBest: (req, res) => {
        AlgorithmModel.getBestProblems(req.mysql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "베스트 문제 조회 실패" });
            }
            res.json(result);
        });
    },

    getWorst: (req, res) => {
        AlgorithmModel.getWorstProblems(req.mysql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "워스트 문제 조회 실패" });
            }
            res.json(result);
        });
    },

    getTest: (req, res) => {
        AlgorithmModel.getTest(req.mysql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "테스트 문제 조회 실패" });
            }
            res.json(result);
        });
    }
};

module.exports = AlgorithmController;
