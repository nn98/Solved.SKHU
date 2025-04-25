// models/ratingModel.js
class RatingModel {
    static executeQuery(connection, sql, params = []) {
        return new Promise((resolve, reject) => {
            connection.query(sql, params, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async getSkhurank(connection, userId) {
        const sql = 'SELECT skhurank FROM user WHERE user_id = ?';
        const result = await this.executeQuery(connection, sql, [userId]);
        return result.length > 0 ? result[0].skhurank : null;
    }

    static async getProblemsAndUsers(connection, userId, skhurank) {
        // SQL 쿼리 조립 (템플릿 리터럴 활용)
        let problemsSql = `
            SELECT
                p.problem_id,
                p.namekr,
                p.solved_rank,
                COUNT(s.problem_id) AS sum
            FROM
                solve s
                INNER JOIN
                user u ON s.user_id = u.user_id
                INNER JOIN
                problem p ON s.problem_id = p.problem_id
                LEFT JOIN
                solve s2 ON p.problem_id = s2.problem_id AND s2.user_id = ?
            WHERE
                u.skhurank BETWEEN ? - 2 AND ? + 2
              AND s2.problem_id IS NULL
            GROUP BY
                p.problem_id, p.namekr, p.solved_rank
            HAVING
                COUNT(s.problem_id) >= 1
            ORDER BY
                sum DESC;

        `;

        let usersSql = `
      SELECT * FROM user WHERE skhurank = ? - 2
      UNION SELECT * FROM user WHERE skhurank = ? - 1
      UNION SELECT * FROM user WHERE skhurank = ?
      UNION SELECT * FROM user WHERE skhurank = ? + 1
      UNION SELECT * FROM user WHERE skhurank = ? + 2
    `;

        // skhurank가 1일 때는 일부 쿼리만 사용
        let problemsParams, usersParams;
        if (skhurank === 1) {
            problemsSql = `
        SELECT problem_id, namekr, solved_rank, COUNT(problem_id) AS sum
        FROM user
        RIGHT JOIN solve ON user.user_id = solve.user_id
        JOIN problem ON solve.problem_id = problem.problem_id
        WHERE user.user_id IN (
          SELECT user_id FROM user WHERE skhurank = ? + 1
          UNION SELECT user_id FROM user WHERE skhurank = ? + 2
        )
        AND problem_id NOT IN (
          SELECT problem_id FROM solve WHERE user_id = ?
        )
        GROUP BY problem_id
        HAVING COUNT(problem_id) >= 1
        ORDER BY COUNT(problem_id) DESC
      `;
            usersSql = `
        SELECT * FROM user WHERE skhurank = ?
        UNION SELECT * FROM user WHERE skhurank = ? + 1
        UNION SELECT * FROM user WHERE skhurank = ? + 2
      `;
            problemsParams = [skhurank, skhurank, userId];
            usersParams = [skhurank, skhurank, skhurank];
        } else {
            problemsParams = [skhurank, skhurank, skhurank, skhurank, userId];
            usersParams = [skhurank, skhurank, skhurank, skhurank, skhurank];
        }

        // 두 쿼리를 동시에 실행하고 결과를 합침
        const [problems, users] = await Promise.all([
            this.executeQuery(connection, problemsSql, problemsParams),
            this.executeQuery(connection, usersSql, usersParams),
        ]);
        return { problems, users };
    }
}

module.exports = RatingModel;