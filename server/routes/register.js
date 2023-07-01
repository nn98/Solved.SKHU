const express = require('express');
const router = express.Router();
const WaitNotify = require("wait-notify");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const waitNotify_StudentRegister = new WaitNotify();  // AssignTaskExecute_StudentRegister
let AssignTaskExecute_StudentRegister = false;          // - waitNotify_StudentRegister
// UserRegister - canceled _ addCorrection ?_ userUpdate ?_ solvePage ?_ correction Update
const waitNotify_UserRegister = new WaitNotify();     // AssignTaskExecute_UserRegister
let AssignTaskExecute_UserRegister = false;             // - waitNotify_UserRegister

/* --------------- Register Part - Professor --------------- */
app.post('/professor', (req, res) => {
    console.log('proRegister/post ', 'is called');
    // console.log(req);
    const b = req.body;
    // console.log(b);
    if ((b.pC === 'proskhuOp12#') | (b.pC === 'S')) {
        for (let i = 0; i < b.cN; i++) {
            const sql =
                'insert into lecture (professor, code, name, distribution) values(' +
                "'" +
                b.pN +
                "', " +
                "'" +
                b.sC +
                "', " +
                "'" +
                b.sN +
                (b.cN < 2 ? '' : '-0' + (i + 1)) +
                "', " +
                (i + 1) +
                ');';
            console.log(sql);
            connection.query(sql, function (err, result, fields) {
                if (err) {
                    res.status(406).json('에러가 발생했습니다. 입력 내용을 확인해주세요.');
                }
            });
        }
        res.status(200).json('강의 등록이 완료되었습니다.');
    } else {
        res.status(406).json('교수 승인코드가 틀렸습니다.');
    }
});
/* --------------- Register Part - Professor / Register Part - Student --------------- */
app.get('/student', (req, res) => {
    console.log('studentRegister/get ', 'is called');
    const b = req.body;
    console.log('body', b);
    res.send(b);
});

app.post('/student', async (req, res) => {
    console.log('studentRegister/post ', 'is called');
    const b = req.body;
    let end = false;
    console.log('body', b);
    if ((b.sC === 'stuSK#') | (b.sC === 'S')) {
        console.log('Student code is correct');
        let sql =
            'insert into student (id, name, bojid) values(' +
            Number(b.sI) +
            ', ' +
            "'" +
            b.sN +
            "', " +
            "'" +
            b.bI +
            "');";
        console.log('학생 등록 쿼리 시작', sql);
        AssignTaskExecute_StudentRegister = true;
        connection.query(sql, async function (err, result, fields) {
            console.log('학생 테이블 존재 여부 확인');
            if (err) {
                console.log('res', '쿼리 실행이 실패했습니다. 해당 학생이 이미 존재합니다.');
                AssignTaskExecute_StudentRegister = false;
                waitNotify_StudentRegister.notify();
            } else {
                console.log('res', '쿼리 실행이 성공했습니다. 신규 학생입니다.');
            }
            AssignTaskExecute_StudentRegister = false;
            waitNotify_StudentRegister.notify();
        });
        if (AssignTaskExecute_StudentRegister) await waitNotify_StudentRegister.wait();

        console.log('존재 여부 확인 완료.');
        AssignTaskExecute_StudentRegister = true;
        sql = 'insert into learn values(' + Number(b.sI) + ',' + b.lI + ');';
        console.log('수강 등록 쿼리', sql);
        connection.query(sql, async function (err, result, fields) {
            console.log('수강 등록');
            if (err) {
                console.log('res', '쿼리 실행이 실패했습니다.');
                res.status(406).json('에러가 발생했습니다. 이미 수강중인 학생입니다.');
                end = true;
                return;
            } else {
                console.log('res', '쿼리 실행이 성공했습니다.');
            }
            AssignTaskExecute_StudentRegister = false;
            waitNotify_StudentRegister.notify();
        });
        if (AssignTaskExecute_StudentRegister) await waitNotify_StudentRegister.wait();
        if (end) return;
        res.status(200).json('학생 등록이 완료되었습니다.');
    } else {
        console.log('Student code isnt correct');
        console.log('res', '학생 승인코드가 틀렸습니다.');
        res.status(406).json('학생 승인코드가 틀렸습니다.');
    }
});
/* --------------- Register Part - Student --------------- */

/* --------------- UserRegister --------------- */
app.post('/', async (req, res) => {
    const url = 'https://solved.ac/ranking/o/309';
    const b = req.body;
    let errOcc = false;
    console.log(b);
    let resul = [];
    let ti;
    console.log('check student code');
    if (b.rC !== 'stuSK#') {
        res.status(406).json('학생 승인코드가 틀렸습니다.');
        return;
    }
    AssignTaskExecute_UserRegister = true;
    console.log('solved check success');
    let sqls = 'select * from user where id = "' + b.ui + '"';
    console.log('run conntion', sqls);

    if (errOcc) return;

    connection.query(sqls, async function (err, result, fields) {
        console.log(result.length === 0);
        if (result.length === 0) {
            console.log('User 데이터베이스에 해당 학생 없음. 등록 가능');
        } else {
            console.log('send response', '에러가 발생했습니다. 이미 존재하는 학생입니다.');
            res.status(406).json('에러가 발생했습니다. 이미 존재하는 학생입니다.');
            AssignTaskExecute_UserRegister = false;
            waitNotify_UserRegister.notify();
            errOcc = true;
        }
    });
    addRegister(b.uI, url);
    if (AssignTaskExecute_UserRegister) await waitNotify_UserRegister.wait();
    console.log(errOcc);
    if (errOcc) return;

    // 입력받은 유저를 랭킹테이블(데이터베이스)에 추가하는 함수
    async function addRegister(pID, url) {
        puppeteer
            .launch({ headless: true })
            .then(async browser => {
                const page = await browser.newPage();

                await page.goto(url, { waitUntil: 'networkidle2' });
                const content = await page.content();
                const $ = cheerio.load(content);
                const lists = $('tr');

                let name = [];
                let c = [];
                let d = [];

                lists.each((index, list) => {
                    name = $(list).find('td').toString();
                    if (name.includes(b.uI) === true) {
                        c = name;
                        d = c.split('</td>');
                    }
                });
                ti = $(c).find('img').toString();

                for (let e = 0; e < d.length; e++) {
                    resul[e] = d[e].replace(/(<([^>]+)>)|&nbsp;/gi, '');
                }
                if (resul.length === 0) {
                    errOcc = true;
                    console.log('err in solved.ac');
                    AssignTaskExecute_UserRegister = false;
                    waitNotify_UserRegister.notify();
                    res.status(406).json('Solved.ac에서 해당 ID를 찾을 수 없습니다. 등록 후 시도해주세요');
                    return;
                }
                console.log(resul);
                console.log('suc in solved.ac');
                AssignTaskExecute_UserRegister = false;
                waitNotify_UserRegister.notify();
            })
            .catch(error => {
                errOcc = true;
                console.log('err in solved.ac', error);
                AssignTaskExecute_UserRegister = false;
                waitNotify_UserRegister.notify();
                res.status(406).json('솔브드에서 응답하지 않습니다. 잠시후 다시 시도해주세요');
            });
    }

    let name2 = [];
    let pages = 1;
    let d2 = [];
    let resul2 = [];
    // 입력받은 유저의 정답률을 크롤링하는 함수
    async function addCorrection(pID, url) {
        console.log('addCorrection is run_to:', url);

        puppeteer
            .launch({ headless: true })
            .then(async browser => {
                const page = await browser.newPage();

                await page.goto(url, { waitUntil: 'networkidle2' });
                const content = await page.content();
                // $에 cheerio를 로드한다.
                const $ = cheerio.load(content);
                // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
                const lists2 = $('tr');
                // 모든 리스트를 순환한다.
                let c2 = [];
                lists2.each((index, list) => {
                    name2 = $(list).find('td').toString();
                    if (name2.includes(b.uI) === true) {
                        c2 = name2;
                        d2 = c2.split('</td>');
                    }
                });
                console.log(pages);
                // console.log(c2===undefined)
                for (let e = 0; e < d2.length; e++) {
                    resul2[e] = d2[e].replace(/(<([^>]+)>)|&nbsp;/gi, '');
                    console.log(resul2[e]);
                }

                AssignTaskExecute_UserRegister = false;
                waitNotify_UserRegister.notify();
            })

            .catch(error => {
                console.log(error);
                AssignTaskExecute_UserRegister = false;
                waitNotify_UserRegister.notify();
            });
    }
    // 전체랭킹 / 학교랭킹 / ID / 레이팅 / 클래스 / 푼 문제 수 / 티어 / 정답률 / 백준ID
    let worldrank, skhurank, userid, rating, classs, problems, tier, corr, bojid;
    worldrank = resul[0];
    skhurank = resul[1];
    userid = resul[2];
    rating = resul[3];
    classs = resul[4];
    problems = resul[5];
    bojid = b.gI;
    tier = ti.split('<img src="https://static.solved.ac/tier_small/')[1].split('.svg"')[0];
    console.log(
        worldrank +
        ' ' +
        skhurank +
        ' ' +
        userid +
        ' ' +
        rating +
        ' ' +
        classs +
        ' ' +
        problems +
        ' ' +
        bojid +
        ' ' +
        tier
    );
    corr = undefined;
    while (corr === undefined) {
        AssignTaskExecute_UserRegister = true;
        addCorrection(b.uI, 'https://www.acmicpc.net/school/ranklist/309/' + pages);
        if (AssignTaskExecute_UserRegister) await waitNotify_UserRegister.wait();
        corr = resul2[resul2.length - 2];
        console.log('corr:', corr);
        pages++;
    }
    console.log(
        userid +
        '",' +
        problems +
        ',' +
        tier +
        ',"' +
        worldrank +
        '",' +
        skhurank +
        ',' +
        rating +
        ',"' +
        classs +
        '","' +
        corr
    );
    const sql =
        'insert into user values("' +
        userid +
        '",' +
        problems +
        ',' +
        tier +
        ',"' +
        worldrank +
        '",' +
        skhurank +
        ',' +
        rating +
        ',"' +
        classs +
        '","' +
        corr +
        '","' +
        bojid +
        '");';
    console.log(sql);
    // 등록할 학생을 DB에 넣는 과정
    connection.query(sql, async function (err, result, fields) {
        if (err) {
            console.log('err in insert', err);
            res.status(406).json('error');
        }
        res.status(200).json('학생 등록이 완료되었습니다. 새로고침 후 이용해주시기 바랍니다.');
    });
    AssignTaskExecute_UserRegister = true;
    userUpdate(url, req);
    let updateP = 1;
    while (updateP <= 3) {
        AssignTaskExecute_UserRegister = true;
        correctionUpdate('https://www.acmicpc.net/school/ranklist/309/' + updateP);
        if (AssignTaskExecute_UserRegister) await waitNotify_UserRegister.wait();
        updateP++;
    }
});
// 전체 학생 정보 업데이트 함수
async function userUpdate(url, req) {
    puppeteer
        .launch({ headless: true })
        .then(async browser => {
            const page = await browser.newPage();

            await page.goto(url, { waitUntil: 'networkidle2' });
            const content = await page.content();
            // $에 cheerio를 로드한다.
            const $ = cheerio.load(content);
            // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
            const lists3 = $('tr');
            // 모든 리스트를 순환한다.
            let c3 = [];
            let d3 = [];
            let name3 = [];
            let resul3 = [];
            let tiee;
            let worldrank, skhurank, userid, rating, classs, problems, tie, bojid;
            lists3.each((index, lists) => {
                if (index > 0) {
                    name3 = $(lists).find('td').toString();
                    c3 = name3;
                    d3 = c3.split('</td>');
                    tiee = $(c3).find('img').toString();
                    // console.log(tiee[index].split('.svg"')[0].replace(/[^0-9]/gi,""))
                    for (let e = 0; e < d3.length; e++) {
                        resul3[e] = d3[e].replace(/(<([^>]+)>)|&nbsp;/gi, '');
                    }
                    worldrank = resul3[0];
                    skhurank = resul3[1];
                    userid = resul3[2];
                    rating = resul3[3];
                    classs = resul3[4];
                    problems = resul3[5].replace(',', '');
                    tie = tiee.split('.svg"')[0].replace(/[^0-9]/gi, '');
                    // console.log(ti);
                    bojid = req.body.gI;
                    // console.log('worldrank : ',worldrank,'skhurank : ', skhurank,'userid : ', userid,'rating : ', rating,'class : ' ,classs,'problems : ', problems,'tier : ' ,tie,'bojid : ', bojid);
                    const sql =
                        'update user set problems = ' +
                        problems +
                        ', solvedrank = ' +
                        tie +
                        ',worldrank="' +
                        worldrank +
                        '",skhurank=' +
                        skhurank +
                        ',rating=' +
                        rating +
                        ',class="' +
                        classs +
                        '",gitid = "' +
                        bojid +
                        '" where id = "' +
                        userid +
                        '";';
                    console.log(sql);
                    connection.query(sql, async function (err, result, fields) {
                        if (err) {
                            console.log('err in update', err);
                        }
                    });
                }
                console.log();
            });
            solvePage('https://solved.ac/profile/' + req.body.uI + '/solved', req.body.uI);
            AssignTaskExecute_UserRegister = false;
            waitNotify_UserRegister.notify();
        })
        .catch(error => {
            console.log(error);
        });
}
async function solvePage(url, userid) {
    puppeteer
        .launch({ headless: true })
        .then(async browser => {
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);
            await page.goto(url, { waitUntil: 'networkidle2' });
            const content = await page.content();
            let solpage = 1;
            const $ = cheerio.load(content);
            const list5 = $('#__next > div > div.css-axxp2y > div > div:nth-child(4) > div.css-18lc7iz');
            const pages = $(list5).find('a').toString();
            let a = pages.split('</a>');
            let b = a[a.length - 2].split(/class="css-af4alp">|class="css-1orliys">/);
            console.log(b[1]);
            while (solpage <= b[1]) {
                solveProblem('https://solved.ac/profile/' + userid + '/solved?page=' + solpage++, userid);
            }

            AssignTaskExecute_UserRegister = false;
            waitNotify_UserRegister.notify();
        })

        .catch(error => {
            console.log(error);
        });
}
async function solveProblem(url, userid) {
    puppeteer
        .launch({ headless: true })
        .then(async browser => {
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);
            await page.goto(url, { waitUntil: 'networkidle2' });
            const content = await page.content();
            const $ = cheerio.load(content);
            const lists = $('tr');
            let c5 = [];
            let d5 = [];
            let name5 = [];
            let resul5 = [];
            lists.each((index, list) => {
                name5 = $(list).find('td').toString();
                c5 = name5;
                d5 = c5.split('</td>');
                resul5[0] = d5[0].replace(/(<([^>]+)>)|&nbsp;/gi, '');
                const sql =
                    'insert into solve(user_id, problem_id) values("' + userid + '","' + resul5[0] + '")';
                console.log(sql);
                try {
                    connection.query(sql, async function (err, result, fields) {
                        if (err) {
                            console.log('err in update', err);
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            });
            AssignTaskExecute_UserRegister = false;
            waitNotify_UserRegister.notify();
        })

        .catch(error => {
            console.log(error);
        });
}
async function correctionUpdate(url) {
    puppeteer
        .launch({ headless: true })
        .then(async browser => {
            const page = await browser.newPage();

            await page.goto(url, { waitUntil: 'networkidle2' });
            const content = await page.content();
            // $에 cheerio를 로드한다.
            const $ = cheerio.load(content);
            // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
            const lists4 = $('tr');
            // 모든 리스트를 순환한다.
            let c4 = [];
            let d4 = [];
            let name4 = [];
            let resul4 = [];
            let id;
            let correction;
            lists4.each((index, list) => {
                name4 = $(list).find('td').toString();
                c4 = name4;
                d4 = c4.split('</td>');
                for (let e = 0; e < d4.length; e++) {
                    resul4[e] = d4[e].replace(/(<([^>]+)>)|&nbsp;/gi, '');
                }
                id = resul4[1];
                correction = resul4[resul4.length - 2];
                const sql = 'update user set correction = "' + correction + '" where id = "' + id + '";';
                console.log(sql);
                connection.query(sql, async function (err, result, fields) {
                    if (err) {
                        console.log('err in update', err);
                    }
                });
            });
            // console.log(pages)
            // console.log(c2===undefined)

            AssignTaskExecute_UserRegister = false;
            waitNotify_UserRegister.notify();
        })

        .catch(error => {
            console.log(error);
        });
}
/* --------------- UserRegister --------------- */

module.exports = router;