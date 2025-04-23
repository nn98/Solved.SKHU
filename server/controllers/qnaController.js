const QnaModel = require('../models/qnaModel');
const humps = require('humps');

const QnaController = {
    // 사용자 생성
    createUser: async (req, res) => {
        try {
            console.log('[QnA] createUser 호출');
            const snakeBody = humps.decamelizeKeys(req.body);
            console.log('[QnA] createUser snakeBody:', snakeBody);
            await QnaModel.createUser(snakeBody);
            res.status(201).json({ message: '사용자 회원가입이 완료되었습니다.\n질문을 작성해보세요.' });
        } catch (err) {
            console.log('[QnA] createUser error:', err);
            const snakeBody = humps.decamelizeKeys(req.body);
            console.log('[QnA] createUser (error) snakeBody:', snakeBody);
            const user = await QnaModel.verifyUser(snakeBody);
            if (user) return res.status(401).json({ error: '이미 존재하는 사용자입니다.' });
            res.status(500).json({ error: '사용자 생성이 실패했습니다.' });
        }
    },

    // 질문 전체 조회
    getQuestions: async (req, res) => {
        try {
            console.log('[QnA] getQuestions 호출');
            const questions = await QnaModel.getQuestions();
            res.json(humps.camelizeKeys(questions));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 문제 목록 조회
    getProblems: async (req, res) => {
        try {
            console.log('[QnA] getProblems 호출');
            const problems = await QnaModel.getProblems();
            res.json(humps.camelizeKeys(problems));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 답변 전체 조회
    getAnswers: async (req, res) => {
        try {
            console.log('[QnA] getAnswers 호출');
            const answers = await QnaModel.getAnswers();
            res.json(humps.camelizeKeys(answers));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 질문 추가
    addQuestion: async (req, res) => {
        try {
            console.log('[QnA] addQuestion 호출');
            const snakeBody = humps.decamelizeKeys(req.body);
            console.log('[QnA] addQuestion snakeBody:', snakeBody);
            const user = await QnaModel.verifyUser(snakeBody);
            if (!user) return res.status(401).json({ error: '사용자 인증 실패' });

            await QnaModel.addQuestion(snakeBody);

            const questions = await QnaModel.getQuestions();
            res.status(201).json({
                message: '질문이 등록되었습니다.',
                comment: humps.camelizeKeys(questions)
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 답변 추가 (특정 질문에)
    addAnswer: async (req, res) => {
        try {
            console.log('[QnA] addAnswer 호출');
            const { questionId } = req.params;
            const snakeBody = humps.decamelizeKeys({ ...req.body, questionId: Number(questionId) });
            console.log('[QnA] addAnswer snakeBody:', snakeBody);
            const user = await QnaModel.verifyUser(snakeBody);
            if (!user) return res.status(401).json({ error: '사용자 인증 실패' });

            await QnaModel.addAnswer(snakeBody);

            const answers = await QnaModel.getAnswers();
            res.status(201).json({
                message: '답변이 등록되었습니다.',
                comment: humps.camelizeKeys(answers)
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        }
    },

    // 질문 삭제
    deleteQuestion: async (req, res) => {
        try {
            console.log('[QnA] deleteQuestion 호출');
            const { id } = req.params;
            const snakeBody = humps.decamelizeKeys({ ...req.body, questionId: Number(id) });
            console.log('[QnA] deleteQuestion snakeBody:', snakeBody);
            const user = await QnaModel.verifyUser(snakeBody);
            if (!user) return res.status(401).json({ error: '사용자 인증 실패' });

            await QnaModel.deleteQuestion(snakeBody);
            const questions = await QnaModel.getQuestions();
            res.status(201).json({
                message: '질문이 삭제되었습니다.',
                comment: humps.camelizeKeys(questions)
            });
        } catch (err) {
            res.status(404).json({ error: '삭제할 데이터가 없습니다' });
        }
    },

    // 답변 삭제
    deleteAnswer: async (req, res) => {
        try {
            console.log('[QnA] deleteAnswer 호출');
            const { id } = req.params;
            const snakeBody = humps.decamelizeKeys({ ...req.body, answerId: Number(id) });
            console.log('[QnA] deleteAnswer snakeBody:', snakeBody);
            const user = await QnaModel.verifyUser(snakeBody);
            if (!user) return res.status(401).json({ error: '사용자 인증 실패' });

            await QnaModel.deleteAnswer(snakeBody);
            const answers = await QnaModel.getAnswers();
            res.json({
                message: '답변이 삭제되었습니다.',
                comment: humps.camelizeKeys(answers)
            });
        } catch (err) {
            res.status(404).json({ error: '삭제할 데이터가 없습니다' });
        }
    }
};

module.exports = QnaController;
