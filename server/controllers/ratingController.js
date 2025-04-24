// controllers/ratingController.js
const RatingModel = require('../models/ratingModel');

const RatingController = {
    getRating: async (req, res) => {
        try {
            const userId = req.body.ID;
            if (!userId) return res.status(400).json({ error: 'ID is required' });

            // skhurank 조회
            const skhurank = await RatingModel.getSkhurank(req.mysql, userId);
            if (skhurank === null) return res.status(404).json({ error: 'User not found' });

            // 문제 및 유저 목록 조회
            const { problems, users } = await RatingModel.getProblemsAndUsers(req.mysql, userId, skhurank);

            console.log('problems',problems,'users',users);
            res.json({ problems, users });
        } catch (err) {
            console.error('Rating Error:', err);
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = RatingController;
