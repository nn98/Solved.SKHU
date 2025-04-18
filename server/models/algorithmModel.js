const prisma = require('../prisma/client');

class AlgorithmModel {
    static async getMaxAlgorithm() {
        return prisma.$queryRaw`
            SELECT
                problem.solved_rank,
                problem.id,
                problem.namekr,
                problem.rate,
                COUNT(solve.problem_id) AS sum
            FROM solve
                JOIN problem ON solve.problem_id = problem.id
            GROUP BY solve.problem_id
            HAVING COUNT(solve.problem_id) > 0
            ORDER BY sum DESC
                LIMIT 10
        `;
    }

    static async getMinAlgorithm() {
        return prisma.$queryRaw`
            SELECT
                problem.solved_rank,
                problem.id,
                problem.namekr,
                problem.rate,
                COUNT(solve.problem_id) AS sum
            FROM solve
                JOIN problem ON solve.problem_id = problem.id
            GROUP BY solve.problem_id
            HAVING COUNT(solve.problem_id) > 0
            ORDER BY sum ASC
                LIMIT 10
        `;
    }

    static async getBestAlgorithm() {
        return prisma.$queryRaw`
            SELECT
                id,
                namekr,
                rate,
                solved_rank
            FROM problem
            WHERE
                id IN (SELECT problem_id FROM solve)
              AND namekr REGEXP '^[가-힇 % %]*$'
            ORDER BY CAST(rate AS SIGNED) DESC
                LIMIT 10
        `;
    }

    static async getWorstAlgorithm() {
        return prisma.$queryRaw`
            SELECT
                id,
                namekr,
                rate,
                solved_rank
            FROM problem
            WHERE
                id IN (SELECT problem_id FROM solve)
              AND namekr REGEXP '^[가-힇 % %]*$'
            ORDER BY CAST(rate AS SIGNED) ASC
                LIMIT 10
        `;
    }
}

module.exports = AlgorithmModel;
