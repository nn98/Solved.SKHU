const prisma = require('../prisma/client');

class RegisterModel {
    // 교수 강의 등록
    static async registerProfessor(professorData) {
        const { pC, pN, sC, sN, cN } = professorData;
        if (pC !== 'proskhuOp12#' && pC !== 'S') {
            throw new Error('Invalid professor code');
        }

        const lectures = Array.from({ length: cN }, (_, i) => ({
            professor: pN,
            code: sC,
            name: cN < 2 ? sN : `${sN}-0${i + 1}`,
            distribution: i + 1,
        }));

        await prisma.lecture.createMany({ data: lectures });
    }

    // 학생 등록
    static async registerStudent(studentData) {
        const { sC, sI, sN, bI, lI } = studentData;
        if (sC !== 'stuSK#' && sC !== 'S') {
            throw new Error('Invalid student code');
        }

        await prisma.$transaction(async (tx) => {
            // 학생 정보 등록
            await tx.student.create({
                data: {
                    id: Number(sI),
                    name: sN,
                    bojid: bI,
                },
            });

            // 수강 정보 등록
            await tx.learn.create({
                data: {
                    studentId: Number(sI),
                    lectureId: lI,
                },
            });
        });
    }
}

module.exports = RegisterModel;
