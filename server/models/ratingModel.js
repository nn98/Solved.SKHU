const prisma = require('../prisma/client');

class RatingModel {
    // skhurank 조회
    static async getSkhurank(userId) {
        const user = await prisma.user.findUnique({
            where: { user_id: userId },
            select: { skhurank: true }
        });
        return user ? user.skhurank : null;
    }

    // 문제 및 유저 목록 조회
    static async getProblemsAndUsers(userId, skhurank) {
        // skhurank가 1일 때
        if (skhurank === 1) {
            // 문제 목록: skhurank가 1, 2, 3인 유저가 푼 문제 중, 현재 유저가 안 푼 문제
            const solvedProblems = await prisma.solve.findMany({
                where: { user_id: userId },
                select: { problem_id: true }
            });
            const solvedProblemIds = solvedProblems.map(s => s.problem_id);

            const users = await prisma.user.findMany({
                where: {
                    OR: [
                        { skhurank: 1 },
                        { skhurank: 2 },
                        { skhurank: 3 }
                    ]
                }
            });

            const problems = await prisma.problem.findMany({
                where: {
                    solves: {
                        some: {
                            user: {
                                skhurank: { in: [1, 2, 3] }
                            }
                        },
                        none: {
                            user_id: userId
                        }
                    }
                },
                select: {
                    problem_id: true,
                    namekr: true,
                    solved_rank: true,
                    solves: true
                }
            });

            // solved 개수 집계
            const problemsWithCount = problems.map(p => ({
                ...p,
                sum: p.solves.length
            })).filter(p => p.sum >= 1)
                .sort((a, b) => b.sum - a.sum);

            return { problems: problemsWithCount, users };
        } else {
            // skhurank가 2 이상일 때
            const rankRange = [skhurank - 2, skhurank - 1, skhurank, skhurank + 1, skhurank + 2];

            const solvedProblems = await prisma.solve.findMany({
                where: { user_id: userId },
                select: { problem_id: true }
            });
            const solvedProblemIds = solvedProblems.map(s => s.problem_id);

            const users = await prisma.user.findMany({
                where: {
                    skhurank: { in: rankRange }
                }
            });

            const problems = await prisma.problem.findMany({
                where: {
                    solves: {
                        some: {
                            user: {
                                skhurank: { gte: skhurank - 2, lte: skhurank + 2 }
                            }
                        },
                        none: {
                            user_id: userId
                        }
                    }
                },
                select: {
                    problem_id: true,
                    namekr: true,
                    solved_rank: true,
                    solves: true
                }
            });

            // solved 개수 집계
            const problemsWithCount = problems.map(p => ({
                ...p,
                sum: p.solves.length
            })).filter(p => p.sum >= 1)
                .sort((a, b) => b.sum - a.sum);

            return { problems: problemsWithCount, users };
        }
    }
}

module.exports = RatingModel;
