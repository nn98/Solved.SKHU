// models/qnaModel.js
const prisma = require('../prisma/client');
const humps = require('humps'); // npm install humps

class QnaModel {
    // 사용자 생성
    static async createUser(body) {
        // body: { userId, userPassword, ... }
        const data = humps.decamelizeKeys(body);
        return prisma.qna_user.create({ data });
    }

    // 질문 전체 조회
    static async getQuestions() {
        return prisma.qna_question.findMany({
            orderBy: { createdat: 'desc' }
        });
    }

    // 문제 목록 조회
    static async getProblems() {
        return prisma.$queryRaw`SELECT DISTINCT problem_id FROM solve`;
    }

    // 답변 전체 조회
    static async getAnswers() {
        return prisma.qna_answer.findMany();
    }

    // 사용자 인증
    static async verifyUser(body) {
        // body: { userId, userPassword }
        const where = humps.decamelizeKeys({
            userId: body.userId,
            userPassword: body.userPassword
        });
        return prisma.qna_user.findFirst({ where });
    }

    // 질문 추가
    static async addQuestion(body) {
        // body: { content, userIp, userId, problemId }
        const data = humps.decamelizeKeys({
            content: body.content,
            userIp: body.userIp,
            problemId: body.problemId
        });
        // 관계 필드는 직접 명시
        data.qna_user = { connect: { user_id: body.userId } };
        return prisma.qna_question.create({ data });
    }

    // 답변 추가 (특정 질문에)
    static async addAnswer(body) {
        // body: { content, userIp, userId, questionId }
        const data = humps.decamelizeKeys({
            content: body.content,
            userIp: body.userIp,
            userId: body.userId,
            qnaQuestionId: body.questionId
        });
        // user_id, qna_question_id는 snake_case로 맞춰서 사용
        return prisma.qna_answer.create({ data });
    }

    // 질문 단일 삭제
    static async deleteQuestion(body) {
        // body: { questionId }
        return prisma.qna_question.delete({
            where: { qna_question_id: body.questionId }
        });
    }

    // 답변 단일 삭제
    static async deleteAnswer(body) {
        // body: { answerId }
        return prisma.qna_answer.delete({
            where: { qna_answer_id: body.answerId }
        });
    }
}

module.exports = QnaModel;
