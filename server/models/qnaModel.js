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
    static async verifyUser(user_id, password) {
        return prisma.qnauser.findFirst({
            where: {
                user_id: user_id,
                password: password
            }
        });
    }

    // 질문 추가
    static async addQuestion(content, user_ip, user_id, problem) {
        // user_id는 FK 관계라면 connect 사용 필요 (아래 주석 참고)
        return prisma.qna.create({
            data: {
                content,
                user_ip,
                problem,
                user: { connect: { user_id } }
            }
        });
        // 만약 FK가 아니라면 아래처럼 사용
        // return prisma.qna.create({
        //     data: { content, user_ip, user_id, problem }
        // });
    }

    // 답변 추가
    static async addAnswer(content, user_ip, user_id, qna_id) {
        return prisma.qnainner.create({
            data: {
                content,
                user_ip,
                user_id,
                qna_id
            }
        });
    }

    // 질문 삭제
    static async deleteQuestion(qna_question_id, user_id) {
        return prisma.qna.deleteMany({
            where: {
                qna_question_id: qna_question_id,
                user_id: user_id
            }
        });
    }

    // 답변 삭제
    static async deleteAnswer(id, user_id) {
        return prisma.qnainner.deleteMany({
            where: {
                id: id,
                user_id: user_id
            }
        });
    }
}

module.exports = QnaModel;
