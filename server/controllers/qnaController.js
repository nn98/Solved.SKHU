// controllers/qnaController.js
const QnaModel = require('../models/qnaModel');

const QnaController = {
    // 사용자 생성
    createUser: async (req, res) => {
        try {
            await QnaModel.createUser(req.body);
            res.status(201).json({ message: '어서오세요' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 질문 전체 조회
    getQuestions: async (req, res) => {
        try {
            const result = await QnaModel.getQuestions();
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 문제 목록 조회
    getProblems: async (req, res) => {
        try {
            const result = await QnaModel.getProblems();
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 답변 전체 조회
    getAnswers: async (req, res) => {
        try {
            const result = await QnaModel.getAnswers();
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 질문 추가
    addQuestion: async (req, res) => {
        try {
            console.log('questions', req);
            const { userId, password, content, userIP, problem } = req.body;
            console.log('userId', userId, 'password', password, 'content', content, 'userIP', userIP, 'problem', problem);
            const user = await QnaModel.verifyUser(userId, password);
            console.log('user', user);
            if (!user) return res.status(401).json({ error: '사용자 인증 실패' });
            await QnaModel.addQuestion(content, userIP, userId, problem);
            res.status(201).json({ message: '질문이 등록되었습니다.' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 답변 추가 (특정 질문에)
    addAnswer: async (req, res) => {
        try {
            const { userId, password, content, userIP } = req.body;
            const { questionId } = req.params;
            const user = await QnaModel.verifyUser(userId, password);
            if (!user) return res.status(401).json({ error: '사용자 인증 실패' });
            await QnaModel.addAnswer(content, userIP, userId, Number(questionId));
            res.status(201).json({ message: '답변이 등록되었습니다.' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 질문 삭제
    deleteQuestion: async (req, res) => {
        try {
            const { userId, password } = req.body;
            const { id } = req.params;
            const user = await QnaModel.verifyUser(userId, password);
            if (!user) return res.status(401).json({ error: '사용자 인증 실패' });
            const result = await QnaModel.deleteQuestion(Number(id), userId);
            if (result.count === 0) return res.status(404).json({ error: '삭제할 데이터가 없습니다' });
            res.json({ message: '질문이 삭제되었습니다.' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 답변 삭제
    deleteAnswer: async (req, res) => {
        try {
            const { userId, password } = req.body;
            const { id } = req.params;
            const user = await QnaModel.verifyUser(userId, password);
            if (!user) return res.status(401).json({ error: '사용자 인증 실패' });
            const result = await QnaModel.deleteAnswer(Number(id), userId);
            if (result.count === 0) return res.status(404).json({ error: '삭제할 데이터가 없습니다' });
            res.json({ message: '답변이 삭제되었습니다.' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = QnaController;
