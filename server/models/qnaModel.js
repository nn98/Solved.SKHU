const prisma = require('../prisma/client');

class QnaModel {
    // 사용자 생성
    static async createUser(body) {
        // body: { user_id, user_password, ... }
        return prisma.qna_user.create({ data: body });
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
        return prisma.qna_answer.findMany({
            orderBy: { createdat: 'desc' }
        });
    }

    // 사용자 인증
    static async verifyUser(body) {
        // body: { user_id, user_password }
        if (body.user_id === undefined || body.user_password === undefined) return false;
        return prisma.qna_user.findFirst({
            where: {
                user_id: body.user_id,
                user_password: body.user_password
            }
        });
    }

    // 질문 추가
    static async addQuestion(body) {
        // body: { content, user_ip, user_id, problem_id }
        // 관계 필드는 직접 명시
        return prisma.qna_question.create({
            data: {
                content: body.content,
                user_ip: body.user_ip,
                problem_id: body.problem_id,
                qna_user: { connect: { user_id: body.user_id } }
            }
        });
    }

    // 답변 추가 (특정 질문에)
    static async addAnswer(body) {
        // body: { content, user_ip, user_id, qna_question_id }
        return prisma.qna_answer.create({
            data: {
                content: body.content,
                user_ip: body.user_ip,
                qna_user: { connect: { user_id: body.user_id } },
                qna_question: { connect: { qna_question_id: body.qna_question_id } },
            }
        });
    }

    // 질문 단일 삭제
    static async deleteQuestion(body) {
        // body: { qna_question_id }
        return prisma.qna_question.delete({
            where: { qna_question_id: body.qna_question_id },
        });
    }

    // 답변 단일 삭제
    static async deleteAnswer(body) {
        // body: { qna_answer_id }
        return prisma.qna_answer.delete({
            where: { qna_answer_id: body.answer_id }
        });
    }
}

module.exports = QnaModel;
