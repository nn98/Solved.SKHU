// controllers/rankingController.js
const RankingModel = require('../models/rankingModel');

const RankingController = {
    getRanking: async (req, res) => {
        try {
            const users = await RankingModel.getAllUsersByRank();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = RankingController;
