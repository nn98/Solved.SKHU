const prisma = require('../prisma/client');
const DefaultCrawler = require('../service/crawlers/default');

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
                    student_id: Number(sI),
                    name: sN,
                    bojid: bI,
                },
            });

            // 수강 정보 등록
            await tx.learn.create({
                data: {
                    student_id: Number(sI),
                    lecture_id: lI,
                },
            });
        });
    }

    static async isUserExists(connection, userId) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE user_id = ?', [userId], (err, result) => {
                if (err) return reject(err);
                resolve(result.length > 0);
            });
        });
    }

    static async getSolvedAcUserData(userId, url) {
        const $ = await CrawlerService.fetchCheerio(url);
        let foundRow = null;
        $('tr').each((_, row) => {
            const rowHtml = $(row).find('td').toString();
            if (rowHtml.includes(userId)) foundRow = rowHtml;
        });
        if (!foundRow) return null;

        const cols = foundRow.split('</td>');
        const imgTag = $(foundRow).find('img').toString();
        const tier = imgTag
            ? (imgTag.match(/tier_small\/(\d+)\.svg/) || [])[1] || null
            : null;
        const resul = cols.map(col => col.replace(/(<([^>]+)>)|&nbsp;/gi, ''));

        return {
            worldrank: resul[0],
            skhurank: resul[1],
            user_id: resul[2],
            rating: resul[3],
            classs: resul[4],
            problems: resul[5],
            tier,
        };
    }

    // solved.ac 프로필에서 푼 문제 추출
    static async getSolvedProblems(userId, url) {
        const $ = await CrawlerService.fetchPage(url);
        let problems = [];
        $('tr').each((_, row) => {
            const cols = $(row).find('td').toString().split('</td>');
            const problemId = cols[0]?.replace(/(<([^>]+)>)|&nbsp;/gi, '');
            if (problemId) problems.push(problemId);
        });
        return problems;
    }

    // 백준 랭킹에서 정답률 추출
    static async getCorrection(userId, url) {
        const $ = await CrawlerService.fetchPage(url);
        let foundRow = null;
        $('tr').each((_, row) => {
            const rowHtml = $(row).find('td').toString();
            if (rowHtml.includes(userId)) foundRow = rowHtml;
        });
        if (!foundRow) return null;
        const cols = foundRow.split('</td>');
        const resul = cols.map(col => col.replace(/(<([^>]+)>)|&nbsp;/gi, ''));
        return resul[resul.length - 2]; // 정답률 위치
    }

}

module.exports = RegisterModel;
