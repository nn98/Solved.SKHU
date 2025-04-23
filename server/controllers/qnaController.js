const QnaModel = require('../models/qnaModel');

const QnaController = {
    // 사용자 생성
    createUser: async (req, res) => {
        try {
            console.log('createUser req.body:', req.body);
            await QnaModel.createUser(req.body);
            res.status(201).json({ message: '사용자 회원가입이 완료되었습니다.\n질문을 작성해보세요.' });
        } catch (err) {
            console.log('createUser error:', err);
            // verifyUser에도 body 전체 전달
            const user = await QnaModel.verifyUser(req.body);
            if (user) return res.status(401).json({ error: '이미 존재하는 사용자입니다.' });
            res.status(500).json({ error: '사용자 생성이 실패했습니다.' });
        }
    },

    // 질문 전체 조회
    getQuestions: async (req, res) => {
        try {
            const questions = await QnaModel.getQuestions();
            res.json(questions);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 문제 목록 조회
    getProblems: async (req, res) => {
        try {
            const problems = await QnaModel.getProblems();
            res.json(problems);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 답변 전체 조회
    getAnswers: async (req, res) => {
        try {
            const answers = await QnaModel.getAnswers();
            res.json(answers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 질문 추가
    addQuestion: async (req, res) => {
        try {
            console.log('addQuestion req.body:', req.body);
            // verifyUser에도 body 전체 전달
            const user = await QnaModel.verifyUser(req.body);
            if (!user) return res.status(401).json({ error: '사용자 인증 실패' });

            await QnaModel.addQuestion(req.body);

            const questions = await QnaModel.getQuestions();
            res.status(201).json({ message: '질문이 등록되었습니다.', comment: questions });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 답변 추가 (특정 질문에)
    addAnswer: async (req, res) => {
        try {
            console.log('addAnswer req.body:', req.body, 'params:', req.params);
            const { questionId } = req.params;
            // verifyUser에도 body 전체 전달
            const user = await QnaModel.verifyUser(req.body);
            if (!user) return res.status(401).json({ error: '사용자 인증 실패' });

            await QnaModel.addAnswer({ ...req.body, questionId: Number(questionId) });

            const answers = await QnaModel.getAnswers();
            res.status(201).json({ message: '답변이 등록되었습니다.', comment: answers });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 질문 삭제
    deleteQuestion: async (req, res) => {
        try {
            console.log('deleteQuestion req.body:', req.body, 'params:', req.params);
            const { id } = req.params;
            // verifyUser에도 body 전체 전달
            const user = await QnaModel.verifyUser(req.body);
            if (!user) return res.status(401).json({ error: '사용자 인증 실패' });

            await QnaModel.deleteQuestion({ questionId: Number(id) });
            const questions = await QnaModel.getQuestions();
            res.status(201).json({ message: '질문이 삭제되었습니다.', comment: questions });
        } catch (err) {
            res.status(404).json({ error: '삭제할 데이터가 없습니다' });
        }
    },

    // 답변 삭제
    deleteAnswer: async (req, res) => {
        try {
            console.log('deleteAnswer req.body:', req.body, 'params:', req.params);
            const { id } = req.params;
            // verifyUser에도 body 전체 전달
            const user = await QnaModel.verifyUser(req.body);
            if (!user) return res.status(401).json({ error: '사용자 인증 실패' });

            await QnaModel.deleteAnswer({ answerId: Number(id) });
            const answers = await QnaModel.getAnswers();
            res.json({ message: '답변이 삭제되었습니다.', comment: answers });
        } catch (err) {
            res.status(404).json({ error: '삭제할 데이터가 없습니다' });
        }
    }
};

module.exports = QnaController;
