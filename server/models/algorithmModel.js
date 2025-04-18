// models/algorithmModel.js
const prisma = require('../prisma/client');

class AlgorithmModel {
    // 최다 해결 문제 (Solve 테이블에서 problemId별로 그룹화 후 count)
    static async getMaxProblems() {
        // groupBy + join은 Prisma에서 직접 지원하지 않으므로 2단계로 구현
        const maxSolved = await prisma.solve.groupBy({
            by: ['problemId'],
            _count: { problemId: true },
            orderBy: { _count: { problemId: 'desc' } },
            take: 10,
        });

        const problemIds = maxSolved.map(item => item.problemId);
        const problems = await prisma.problem.findMany({
            where: { id: { in: problemIds } },
            select: {
                id: true,
                namekr: true,
                rate: true,
                solvedRank: true,
            }
        });

        return problemIds.map(pid => {
            const problem = problems.find(p => p.id === pid);
            const count = maxSolved.find(m => m.problemId === pid)._count.problemId;
            return { ...problem, solvedCount: count };
        });
    }

    // 최소 해결 문제
    static async getMinProblems() {
        const minSolved = await prisma.solve.groupBy({
            by: ['problemId'],
            _count: { problemId: true },
            orderBy: { _count: { problemId: 'asc' } },
            take: 10,
        });

        const problemIds = minSolved.map(item => item.problemId);
        const problems = await prisma.problem.findMany({
            where: { id: { in: problemIds } },
            select: {
                id: true,
                namekr: true,
                rate: true,
                solvedRank: true,
            }
        });

        return problemIds.map(pid => {
            const problem = problems.find(p => p.id === pid);
            const count = minSolved.find(m => m.problemId === pid)._count.problemId;
            return { ...problem, solvedCount: count };
        });
    }

    // 베스트 문제 (정규식은 $queryRaw로 처리)
    static async getBestProblems() {
        return prisma.$queryRaw`
            SELECT 
                p.ID as id,
                p.namekr as namekr,
                p.rate as rate,
                p.SOLVED_RANK as solvedRank
            FROM problem p
            WHERE p.ID IN (SELECT s.PROBLEM_ID FROM solve s)
              AND p.namekr REGEXP '^[가-힇 % %]*$'
            ORDER BY CAST(p.rate AS SIGNED) DESC
            LIMIT 10
        `;
    }

    // 워스트 문제 (정규식은 $queryRaw로 처리)
    static async getWorstProblems() {
        return prisma.$queryRaw`
            SELECT 
                p.ID as id,
                p.namekr as namekr,
                p.rate as rate,
                p.SOLVED_RANK as solvedRank
            FROM problem p
            WHERE p.ID IN (SELECT s.PROBLEM_ID FROM solve s)
              AND p.namekr REGEXP '^[가-힇 % %]*$'
            ORDER BY CAST(p.rate AS SIGNED) ASC
            LIMIT 10
        `;
    }
}

module.exports = AlgorithmModel;
