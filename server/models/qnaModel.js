// models/qnaModel.js
const prisma = require('../prisma/client');

class QnaModel {
    // 사용자 생성
    static async createUser(userData) {
        // userData: { name, password, ... }
        return prisma.qnauser.create({ data: userData });
    }

    // 질문 전체 조회
    static async getQuestions() {
        return prisma.qna.findMany({
            orderBy: { createdat: 'desc' }
        });
    }

    // 문제 목록 조회
    static async getProblems() {
        const problems = await prisma.$queryRaw`SELECT DISTINCT problem_id FROM solve`;
        return problems;
    }

    // 답변 전체 조회
    static async getAnswers() {
        return prisma.qnainner.findMany();
    }

    // 사용자 인증
    static async verifyUser(userId, password) {
        console.log('userId', userId, 'password', password);
        return prisma.qnauser.findFirst({
            where: {
                name: userId,
                password: password
            }
        });
    }

    // 질문 추가
    static async addQuestion(content, userIP, userId, problem) {
        return prisma.qna.create({
            data: {
                content,
                userip: userIP,
                user_id: userId,
                problem
            }
        });
    }

    // 답변 추가
    static async addAnswer(content, userIP, userId, qnaId) {
        return prisma.qnainner.create({
            data: {
                content,
                userip: userIP,
                user_id: userId,
                qna_id: qnaId
            }
        });
    }

    // 질문 삭제
    static async deleteQuestion(id, userId) {
        // 질문 id와 user_id가 모두 일치해야 삭제
        return prisma.qna.deleteMany({
            where: {
                id: id,
                user_id: userId
            }
        });
    }

    // 답변 삭제
    static async deleteAnswer(id, userId) {
        return prisma.qnainner.deleteMany({
            where: {
                id: id,
                user_id: userId
            }
        });
    }
}

module.exports = QnaModel;
