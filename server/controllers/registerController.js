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
    },

    handleUserRegister: async (req, res) => {
        const connection = req.mysql; // 미들웨어에서 주입
        const b = req.body;
        const solvedUrl = 'https://solved.ac/ranking/o/309';
        const baekjoonBaseUrl = 'https://www.acmicpc.net/school/ranklist/309/';
        let pages = 1;

        // 승인코드 체크
        if (b.rC !== 'stuSK#') {
            return res.status(406).json('학생 승인코드가 틀렸습니다.');
        }

        // 이미 등록된 유저인지 확인
        if (await RegisterModel.isUserExists(connection, b.uI)) {
            return res.status(406).json('에러가 발생했습니다. 이미 존재하는 학생입니다.');
        }

        // solved.ac에서 유저 정보 크롤링 및 파싱
        const userData = await RegisterModel.getSolvedAcUserData(b.uI, solvedUrl);
        if (!userData) {
            return res.status(406).json('Solved.ac에서 해당 ID를 찾을 수 없습니다. 등록 후 시도해주세요');
        }

        // 백준에서 정답률 크롤링 (여러 페이지 순회)
        let correction;
        while (!correction) {
            correction = await RegisterModel.getCorrection(b.uI, baekjoonBaseUrl + pages);
            pages++;
            if (pages > 10) break; // 무한 루프 방지 (필요시 조정)
        }
        if (!correction) {
            return res.status(406).json('정답률 정보를 찾을 수 없습니다.');
        }

        // DB 등록
        try {
            await RegisterModel.insertUser(connection, userData, b.gI, correction);
            res.status(200).json('학생 등록이 완료되었습니다. 새로고침 후 이용해주시기 바랍니다.');
        } catch (err) {
            res.status(406).json('DB 등록 중 오류가 발생했습니다.');
        }
    }
};

module.exports = RegisterController;
