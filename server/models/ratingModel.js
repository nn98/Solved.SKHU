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
        const sql = 'SELECT skhurank FROM user WHERE id = ?';
        const result = await this.executeQuery(connection, sql, [userId]);
        return result.length > 0 ? result[0].skhurank : null;
    }

    static async getProblemsAndUsers(connection, userId, skhurank) {
        // SQL 쿼리 조립 (템플릿 리터럴 활용)
        let problemsSql = `
      SELECT problem_id, namekr, solved_rank, COUNT(problem_id) AS sum
      FROM user
      RIGHT JOIN solve ON user.id = solve.user_id
      JOIN problem ON solve.problem_id = problem.id
      WHERE user.id IN (
        SELECT id FROM user WHERE skhurank = ? - 2
        UNION SELECT id FROM user WHERE skhurank = ? - 1
        UNION SELECT id FROM user WHERE skhurank = ? + 1
        UNION SELECT id FROM user WHERE skhurank = ? + 2
      )
      AND problem_id NOT IN (
        SELECT problem_id FROM solve WHERE user_id = ?
      )
      GROUP BY problem_id
      HAVING COUNT(problem_id) >= 1
      ORDER BY COUNT(problem_id) DESC
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
        RIGHT JOIN solve ON user.id = solve.user_id
        JOIN problem ON solve.problem_id = problem.id
        WHERE user.id IN (
          SELECT id FROM user WHERE skhurank = ? + 1
          UNION SELECT id FROM user WHERE skhurank = ? + 2
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
