// controllers/ratingController.js
const humps = require('humps'); // [1]
const RatingModel = require('../models/ratingModel');

const RatingController = {
    getRating: async (req, res) => {
        try {
            console.log(req.body);
            const userId = req.body.userId; // [2] camelCase로 통일 권장
            if (!userId) return res.status(400).json({ error: 'id is required' });

            // skhurank 조회
            const skhurank = await RatingModel.getSkhurank(req.mysql, userId);
            if (skhurank === null) return res.status(404).json({ error: 'user not found' });

            // 문제 및 유저 목록 조회
            const { problems, users } = await RatingModel.getProblemsAndUsers(
                req.mysql,
                userId,
                skhurank
            );

            // 키 변환 적용
            const responseData = {
                problems: humps.camelizeKeys(problems), // [3]
                users: humps.camelizeKeys(users)
            };

            res.json(responseData);
        } catch (err) {
            console.error('Rating Error:', err);
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = RatingController;
