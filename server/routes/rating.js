const express = require('express');
const router = express.Router();

/* --------------- Rating Part --------------- */
router.post('/rating', async (req, res) => {
    let i;
    console.log('rating-post: call', req.body.ID);
    const connection = req.mysql;
    const sqls = [
        // 'select skhurank from User where ID ="' + req.body.ID + '";',
        'select problem_id, namekr, solved_rank ,count(problem_id) as sum from user right join solve on user.id = solve.user_id' +
        ' join problem on solve.problem_id = problem.id where user.id in (',

        'select id from user where skhurank = (select skhurank from user where id="' +
        req.body.ID +
        '")-2 ',

        'union select id from user where skhurank = (select skhurank from user where id="' +
        req.body.ID +
        '")-1 union ',

        'select id from user where skhurank = (select skhurank from user where id="' +
        req.body.ID +
        '")+1 ',
        'union select id from user where skhurank = (select skhurank from user where id="' +
        req.body.ID +
        '")+2) ',

        'and problem_id not in(select problem_id from solve where user_id = "' +
        req.body.ID +
        '")' +
        'group by problem_id having count(problem_id)>=1 order by count(problem_id) desc;',
        // ")"
    ];
    const sqls1 = [
        // "",
        '',
        'select * from user where skhurank = (select skhurank from user where id="' +
        req.body.ID +
        '")-2 ',
        'union select * from user where skhurank = (select skhurank from user where id="' +
        req.body.ID +
        '")-1 union ',
        'select * from user where skhurank = (select skhurank from user where id="' +
        req.body.ID +
        '") ',
        'union select * from user where skhurank = (select skhurank from user where id="' +
        req.body.ID +
        '")+1 ',
        'union select * from user where skhurank = (select skhurank from user where id="' +
        req.body.ID +
        '")+2; ',
    ];
    const query1 = 'select skhurank from user where id = "' + req.body.ID + '";';

    AssignTaskExecute_Rating = true;
    connection.query(query1, async function (err, result, fields) {
        if (err) console.log('@@@@@' + err);
        for (let data of result) {
            i = data.skhurank;
        }
        console.log('i', i);
        AssignTaskExecute_Rating = false;
        waitNotify_Rating.notify();
    });
    if (AssignTaskExecute_Rating) await waitNotify_Rating.wait();
    AssignTaskExecute_Rating = true;
    let problems = '';
    let users = '';
    if (i === 1) {
        problems += sqls[0];
        users += sqls1[0];
        for (let k = 3; k < sqls.length; k++) {
            problems += sqls[k];
            users += sqls1[k];
        }
    } else {
        for (let k = 0; k < sqls.length; k++) {
            problems += sqls[k];
            users += sqls1[k];
        }
    }

    AssignTaskExecute_Rating = true;
    console.log('SQL-problems:', problems);
    console.log('SQL-users:', users);
    connection.query(problems + users, req.body, function (err, result, fields) {
        if (err) {
            console.log('@@@@@@@@@@@@@@@@@\n' + err);
            res.send({ error: err.errno });
        } else {
            console.log('rating-post: return Problems/Similar Users', result);
            res.send(result);
        }
        AssignTaskExecute_Rating = false;
        waitNotify_Rating.notify();
    });
    if (AssignTaskExecute_Rating) await waitNotify_Rating.wait();
});
/* --------------- Rating Part --------------- */

module.exports = router;