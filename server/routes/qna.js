// routes/qna.js
const express = require('express');
const router = express.Router();
const QnaController = require('../controllers/qnaController');

// 사용자 등록
router.post('/users', QnaController.createUser);

// 문제 목록 조회
router.get('/problems', QnaController.getProblems);

// 질문 전체 조회
router.get('/questions', QnaController.getQuestions);

// 질문 추가
router.post('/questions', QnaController.addQuestion);

// 질문 삭제
router.delete('/questions/:id', QnaController.deleteQuestion);

// 답변 전체 조회
router.get('/answers', QnaController.getAnswers);

// 특정 질문에 답변 추가
router.post('/questions/:questionId/answers', QnaController.addAnswer);

// 답변 삭제
router.delete('/answers/:id', QnaController.deleteAnswer);

module.exports = router;
