// models/algorithmModel.js
const prisma = require('../prisma/client');

class AlgorithmModel {
    // 최다 해결 문제
    static async getMaxProblems() {
        return prisma.$queryRaw`
      SELECT /*+ MAX_EXECUTION_TIME(5000) */
        p.ID as id, 
        p.namekr as namekr, 
        p.rate as rate, 
        p.SOLVED_RANK as solvedRank,
        COUNT(s.PROBLEM_ID) as solvedCount
      FROM solve s
      JOIN problem p ON s.PROBLEM_ID = p.ID
      GROUP BY s.PROBLEM_ID
      ORDER BY solvedCount DESC
      LIMIT 10
    `;
    }

    // 최소 해결 문제
    static async getMinProblems() {
        return prisma.$queryRaw`
      SELECT /*+ MAX_EXECUTION_TIME(5000) */
        p.ID as id, 
        p.namekr as namekr, 
        p.rate as rate, 
        p.SOLVED_RANK as solvedRank,
        COUNT(s.PROBLEM_ID) as solvedCount
      FROM solve s
      JOIN problem p ON s.PROBLEM_ID = p.ID
      GROUP BY s.PROBLEM_ID
      ORDER BY solvedCount ASC
      LIMIT 10
    `;
    }

    // 베스트 문제
    static async getBestProblems() {
        return prisma.$queryRaw`
      SELECT 
        p.ID as id,
        p.namekr as namekr,
        p.rate as rate,
        p.SOLVED_RANK as solvedRank
      FROM problem p
      JOIN solve s ON p.ID = s.PROBLEM_ID
      WHERE p.namekr REGEXP '^[가-힇 % %]*$'
      GROUP BY p.ID
      ORDER BY p.rate DESC
      LIMIT 10
    `;
    }

    // 워스트 문제
    static async getWorstProblems() {
        return prisma.$queryRaw`
      SELECT 
        p.ID as id,
        p.namekr as namekr,
        p.rate as rate,
        p.SOLVED_RANK as solvedRank
      FROM problem p
      JOIN solve s ON p.ID = s.PROBLEM_ID
      WHERE p.namekr REGEXP '^[가-힇 % %]*$'
      GROUP BY p.ID
      ORDER BY p.rate ASC
      LIMIT 10
    `;
    }

    // 테스트용 조회
    static async getTest() {
        return prisma.problem.findMany({
            take: 10,
            select: { id: true, namekr: true, rate: true, solvedRank: true }
        });
    }
}

module.exports = AlgorithmModel;
