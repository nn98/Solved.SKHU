const express = require('express');
const router = express.Router();
/* --------------- QnA Part --------------- */
router.get('/', (req, res) => {
    const connection = req.mysql;
    const sql = 'select * from qna  order by createdat desc';

    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log('QnA 출력');
        res.send(result);
    });
});

router.post('/User', (req, res) => {
    const connection = req.mysql;
    const sql = 'insert into qnauser set ?';
    connection.query(sql, req.body, function (err, result, fields) {
        if (err) {
            res.send({error: err.errno});
        } else {
            console.log(result);
            res.send({data: '어서오세요'});
        }
    });
});

router.get('/problem', (req, res) => {
    const connection = req.mysql;
    const sql = 'select distinct problem_id from solve;';
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log('QnA문제 출력');
        res.send(result);
    });
});

router.get('/inner', (req, res) => {
    const connection = req.mysql;
    const sql = 'select * from qnainner';
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log('QnA안에꺼 출력');
        res.send(result);
    });
});

router.post('/Add', (req, res) => {
    const connection = req.mysql;
    const userBody = [req.body.userId, req.body.password];
    const userSql = 'select * from qnauser where qnauser.name = ? and qnauser.password = ?;';
    connection.query(userSql, userBody, function (err, result, fields) {
        if (err) throw err;

        if (result.length === 0) {
            res.send({error: '사용자가 올바르지 않습니다.'});
        } else {
            const insertBody = [req.body.content, req.body.userIP, req.body.userId, req.body.problem];
            const insertSql = 'insert into qna(content, userip, user_id, problem) value (?,?,?,?);';
            connection.query(insertSql, insertBody, function (err, result, fields) {
                if (err) throw err;
                console.log('QnA 더하기');
                res.redirect('/');
            });
        }
    });
});

router.post('/InnerAdd', (req, res) => {
    const connection = req.mysql;
    const userBody = [req.body.userId, req.body.password];
    const userSql = 'select * from qnauser where qnauser.name = ? and qnauser.password = ?;';
    connection.query(userSql, userBody, function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0) {
            res.send({error: '사용자가 올바르지 않습니다.'});
        } else {
            const insertBody = [req.body.content, req.body.userIP, req.body.userId, req.body.qnaId];
            const insertSql = 'insert into qnainner(content, userip, user_id, qna_id) value (?,?,?,?);';
            connection.query(insertSql, insertBody, function (err, result, fields) {
                if (err) throw err;
                console.log('QnA안에꺼 더하기');
                res.redirect('/Inner');
            });
        }
    });
});

router.post('/Delete', (req, res) => {
    const connection = req.mysql;
    const userBody = [req.body.userId, req.body.password];
    const userSql = 'select * from qnauser where qnauser.name = ? and qnauser.password = ?;';
    connection.query(userSql, userBody, function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0) {
            res.send({error: '사용자가 올바르지 않습니다.'});
        } else {
            const deleteBody = [req.body.ID, req.body.userId];
            const deleteSql = 'delete from qna where qna.id = ? and qna.user_id = ?;';
            connection.query(deleteSql, deleteBody, function (err, result, fields) {
                if (result.affectedRows === 0) {
                    res.send({error: '사용자가 올바르지 않습니다.'});
                } else {
                    console.log('QnA 삭제');
                    res.redirect('/');
                }
            });
        }
    });
});

router.post('/InnerDelete', (req, res) => {
    const connection = req.mysql;
    const userBody = [req.body.userId, req.body.password];
    const userSql = 'select * from qnauser where qnauser.name = ? and qnauser.password = ?;';
    connection.query(userSql, userBody, function (err, result, fields) {
        if (err) throw err;
        if (result.length === 0) {
            res.send({error: '사용자가 올바르지 않습니다.'});
        } else {
            const deleteBody = [req.body.ID, req.body.userId];
            const deleteSql = 'delete from qnainner where qnainner.id = ? and qnainner.user_id = ?;';
            connection.query(deleteSql, deleteBody, function (err, result, fields) {
                if (result.affectedRows === 0) {
                    res.send({error: '사용자가 올바르지 않습니다.'});
                } else {
                    console.log('QnA안에꺼 삭제');
                    res.redirect('/Inner');
                }
            });
        }
    });
});
/* --------------- QnA Part --------------- */

module.exports = router;