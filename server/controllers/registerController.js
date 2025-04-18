const RegisterModel = require('../models/registerModel');

const RegisterController = {
    // 교수 강의 등록
    handleProRegister: async (req, res) => {
        try {
            await RegisterModel.registerProfessor(req.body);
            res.status(200).json('강의 등록이 완료되었습니다.');
        } catch (err) {
            const message = err.message === 'Invalid professor code'
                ? '교수 승인코드가 틀렸습니다.'
                : '에러가 발생했습니다. 입력 내용을 확인해주세요.';
            res.status(403).json(message);
        }
    },

    // 학생 등록
    handleStudentRegister: async (req, res) => {
        try {
            await RegisterModel.registerStudent(req.body);
            res.status(200).json('학생 등록이 완료되었습니다.');
        } catch (err) {
            const message = err.message === 'Invalid student code'
                ? '학생 승인코드가 틀렸습니다.'
                : '에러가 발생했습니다. 이미 존재하는 정보입니다.';
            res.status(403).json(message);
        }
    }
};

module.exports = RegisterController;
