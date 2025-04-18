// models/qnaModel.js
class QnaModel {
    static executeQuery(connection, sql, params = []) {
        return new Promise((resolve, reject) => {
            connection.query(sql, params, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // 사용자 생성
    static createUser(connection, userData) {
        const sql = 'INSERT INTO qnauser SET ?';
        return this.executeQuery(connection, sql, userData);
    }

    // 질문 전체 조회
    static getQuestions(connection) {
        const sql = 'SELECT * FROM qna ORDER BY createdat DESC';
        return this.executeQuery(connection, sql);
    }

    // 문제 목록 조회
    static getProblems(connection) {
        const sql = 'SELECT DISTINCT problem_id FROM solve';
        return this.executeQuery(connection, sql);
    }

    // 답변 전체 조회
    static getAnswers(connection) {
        const sql = 'SELECT * FROM qnainner';
        return this.executeQuery(connection, sql);
    }

    // 사용자 인증
    static verifyUser(connection, userId, password) {
        const sql = 'SELECT * FROM qnauser WHERE name = ? AND password = ?';
        return this.executeQuery(connection, sql, [userId, password]);
    }

    // 질문 추가
    static addQuestion(connection, content, userIP, userId, problem) {
        const sql = 'INSERT INTO qna(content, userip, user_id, problem) VALUES (?,?,?,?)';
        return this.executeQuery(connection, sql, [content, userIP, userId, problem]);
    }

    // 답변 추가
    static addAnswer(connection, content, userIP, userId, qnaId) {
        const sql = 'INSERT INTO qnainner(content, userip, user_id, qna_id) VALUES (?,?,?,?)';
        return this.executeQuery(connection, sql, [content, userIP, userId, qnaId]);
    }

    // 질문 삭제
    static deleteQuestion(connection, id, userId) {
        const sql = 'DELETE FROM qna WHERE id = ? AND user_id = ?';
        return this.executeQuery(connection, sql, [id, userId]);
    }

    // 답변 삭제
    static deleteAnswer(connection, id, userId) {
        const sql = 'DELETE FROM qnainner WHERE id = ? AND user_id = ?';
        return this.executeQuery(connection, sql, [id, userId]);
    }
}

module.exports = QnaModel;
