
/* --------------- Assignments Part --------------- */
const WaitNotify = require("wait-notify");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
let processing = false;
// global.processing;
let called = 0;
// global.called;

app.get('/assignments', (req, res) => {
    console.log('!+++++++++++++++++++', 'assignments/get ', 'is called');
    let sql =
        'select * from lecture;' +
        'select ID,replace(name,substring(name,2),\'**\') as name,bojid,Lecture_ID from student as s join learn as l on s.id=l.student_id order by name;';
    console.log('get Lectures', sql);

    connection.query(sql, function (err, result, fields) {
        if (err) {
            console.log('error in assignments-get', err);
            throw err;
        }
        console.log('result is recived ... response');
        // res.json(result);
        res.json({ result: result, processing: processing ,called:called});
    });
});

let parallelizationControl;
let assignment_Result = [];
let re_asyncReturn = false;
let re_waitReturn = new WaitNotify();
let myDate;
let sql;

app.post('/assignments', async (req, res) => {
    console.log('!+++++++++++++++++++', 'assignments/post ', 'is called');
    called++;
    console.log('%%%%%processing:',processing);
    processing = true;
    console.log('%%%%%set processing:',processing);
    // console.log('clean assignment_Result');
    assignment_Result = [];
    // console.log(req.body);
    console.log('ID_LIST:\n', req.body.ID_LIST);
    console.log('Problem ID:\t', req.body.PID);
    let pID = req.body.PID;
    let ID_LIST = req.body.ID_LIST;
    let deadLine = req.body.DeadLine;
    let lectureId = ID_LIST[0].Lecture_ID;
    let reAssignment = req.body.reAssignment;
    console.log('deadline:\t\t', deadLine);
    myDate = deadLine.split('-');
    console.log('deadline:\t\t',myDate);
    let myTime = myDate[2].split('T');
    console.log('myTime:\t\t\t',myTime);
    let spTime = myTime[1].split(':');
    spTime[0]=Number(spTime[0])+9;
    console.log('spTime:\t\t\t',spTime);
    var newDate = new Date(myDate[0], myDate[1] - 1, myTime[0], spTime[0]);
    // console.log(newDate.getTime());
    deadLine = newDate.getTime();
    console.log('DL timestamp:\t', deadLine);
    console.log('reAssignment:\t', reAssignment);
    if (!reAssignment) {
        console.log('not reAssign...');
        console.log('#---------','$ASYNC --- wait for checkResult, assignment_R.length:', assignment_Result.length);
        re_asyncReturn = true;
        checkResult(pID, lectureId, deadLine);
        if (re_asyncReturn) await re_waitReturn.wait();
        console.log('#---------','$ASYNC --- checkResult is finish, assignment_R.length:', assignment_Result.length);
    }

    if ((assignment_Result.length < 1) | reAssignment) {
        if (reAssignment) {
            console.log('reAssign...');
            assignment_Result = [];
        }
        console.log('@---------', 'execute assignment.');
        AssignTaskExecute_Assignment_All_Task = true;
        parallelizationControl = [
            { AsyncTaskExecute: false, waitNotify: new WaitNotify(), fin: false },
            { AsyncTaskExecute: false, waitNotify: new WaitNotify(), fin: false },
        ];
        let head_assignment_Result = [];
        let head_ID_LIST = ID_LIST.slice(0, ID_LIST.length / 2);
        let tail_assignment_Result = [];
        let tail_ID_LIST = ID_LIST.slice(ID_LIST.length / 2);

        // console.log('head_ID_LIST', head_ID_LIST);
        // console.log('tail_ID_LIST', tail_ID_LIST);
        // console.log('paral', parallelizationControl);
        // console.log('rere at post:', assignment_Result);

        if (head_ID_LIST.length > 0) run(head_ID_LIST, pID, deadLine, head_assignment_Result, 0);
        if (tail_ID_LIST.length > 0) run(tail_ID_LIST, pID, deadLine, tail_assignment_Result, 1);
        if (AssignTaskExecute_Assignment_All_Task) await waitNotify_Assignment_All_Task.wait();

        // console.log('re_head:', head_assignment_Result);
        // console.log('re_tail:', tail_assignment_Result);

        assignment_Result.push(...head_assignment_Result);
        assignment_Result.push(...tail_assignment_Result);

        // assignment_Result=head_assignment_Result.concat(tail_assignment_Result);
        // console.log("Result-json:",JSON.stringify(assignment_Result));

        // re_asyncReturn = true;
        let isAssigned = false;

        console.log('$$$$$isAssigned?');

        re_asyncReturn = true;

        sql =
            'select * from assignment_result where' +
            ' id=' + pID +
            ' and lectureid=' + lectureId +
            ' and deadline=' + deadLine +
            ";";

        try {
            connection.query(sql, async function (err, result, fields) {
                if (err) {
                    console.log('!#--------err in isAssigned', err);
                    re_asyncReturn = false;
                    re_waitReturn.notify();

                } else {
                    console.log('!#--------isAssigned! length:', result.length);
                    if (result.length > 0) isAssigned = true;
                    re_asyncReturn = false;
                    re_waitReturn.notify();

                }
            });
        } catch (error) {
            console.log('!#--------err in isAssigned', error);
            re_asyncReturn = false;
            re_waitReturn.notify();

        }

        if (re_asyncReturn) await re_waitReturn.wait();

        console.log('#--------- save result...');
        if (reAssignment & isAssigned) {
            sql = 'update assignment_result set'+
                " result='" + JSON.stringify(assignment_Result) +
                "' where" +
                ' id=' + pID +
                ' and lectureid="' + lectureId +
                '" and deadline=' + deadLine +
                ";";
        }
        else {
            console.log('without result:',('insert into assignment_result (id,lectureid,deadline) values(' +
                pID +
                ",'" +
                lectureId +
                "'," +
                deadLine+
                ");"));
            sql =
                'insert into assignment_result (id,result,lectureid,deadline) values(' +
                pID +
                ",'" +
                JSON.stringify(assignment_Result) +
                "'," +
                lectureId +
                "," +
                deadLine+
                ");";

        }

        console.log('$$$$$sql:',sql);

        try {
            connection.query(sql, async function (err, result, fields) {
                if (err) {
                    console.log('!#--------err in update', err);
                } else {
                    console.log('!#--------save success!');
                }
            });
        } catch (error) {
            console.log('!#--------err in update', error);
        }
    }

    console.log('%%%%%wait for return - processing:',processing);
    if (re_asyncReturn) await re_waitReturn.wait();
    // console.log('send response: ', assignment_Result);
    // ID_LIST=assignment_Result;
    processing = false;
    // res.send(assignment_Result);
    console.log('%%%%%return - processing:',processing);
    res.json({ result: assignment_Result, processing: processing });
});

let urls = [
    'https://www.acmicpc.net/status?problem_id=',
    '&user_id=',
    '&language_id=-1&result_id=-1',
];

async function run(ID_LIST, pID, deadLine, assignment_Result, flag) {
    console.log('----------', 'paral:', flag, '1. run');
    // console.log("1. run", assignment_Result);
    // console.log("ID_LIST", ID_LIST);
    console.log('----------', 'paral:', flag, 'pID', pID);
    let processID = ID_LIST[0].bojid;
    let url = urls[0] + pID + urls[1] + processID + urls[2];
    // console.log("rere at run:", assignment_Result);
    execute(ID_LIST, pID, deadLine, processID, url, assignment_Result, flag);
}

async function execute(ID_LIST, pID, deadLine, processID, url, assignment_Result, flag) {
    console.log('----------', 'paral:', flag, '2. execute');
    // console.log("rere at execute:", assignment_Result);
    puppeteer
        .launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
        .then(async browser => {
            if (parallelizationControl[flag].AsyncTaskExecute) {
                await parallelizationControl[flag].waitNotify.wait();
            }

            console.log('----------', 'paral:', flag, 'now process\t', processID);
            parallelizationControl[flag].AsyncTaskExecute = true;
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

            const content = await page.content();
            const $ = cheerio.load(content);
            let re = [];
            const lists = $('tr');

            // console.log(lists);

            let returnData = [];
            let ac = 0;
            if (lists.length > 1) {
                lists.each((index, list) => {
                    let red = [];
                    let lac = 0;
                    let ldate;
                    let rdate;

                    // const name = $(list).find('td').toString();
                    // console.log('name', name);

                    const name0 = $(list).find('td').toString().split('<td>');

                    // !===== #84 check deadLine console.log('name0', name0);
                    // !===== #84 check deadLine for (let i = 0; ++i < name0.length; console.log(i, name0[i]));

                    for (let i = 0; ++i < name0.length; ) {
                        // console.log("N", i, name0[i]);
                        if (name0[i].split('</td>').length > 3) {
                            let v = name0[i].split('</td>');

                            // !===== #84 check deadLine console.log('case 1:', v);

                            for (let j = 0; j < v.length - 1; j++) {
                                let data = v[j].replace(/(<([^>]+)>)/gi, '');

                                // !===== #84 check deadLine console.log('data', data);

                                // AC!! & DL Check
                                lac = lac < 20 ? ((data == '맞았습니다!!')||(data == '100점') ? 20 : 10) : lac;
                                red.push(data);
                            }
                        } else {
                            let x = name0[i].lastIndexOf('data-original-title=');
                            // !===== #84 check deadLine console.log('case 2:', x);
                            if (x >= 0) {
                                let date = name0[i].split('data-original-title="');
                                ldate = date[0].split('data-timestamp="')[1].split('"')[0] + '000';

                                // !===== #84 check deadLine console.log('date', date);
                                // !===== #84 check deadLine console.log('ldate', ldate);

                                red.push(date[1].split('"')[0]);
                            }
                            red.push(name0[i].replace(/(<([^>]+)>)/gi, ''));
                        }
                    }
                    // AC!! & DL Check
                    if (ac < 20) {
                        console.log('----------', 'paral:', flag, 'user:', processID, '- lac', lac);
                        console.log('----------', 'paral:', flag, 'user:', processID, '- ldate', ldate);
                        console.log('----------', 'paral:', flag, 'user:', processID, '- deadLine', deadLine);
                        if (ldate <= deadLine) {
                            ac = lac;
                        } else ac = 10;
                    }
                    returnData.push(red);
                });
            }
            // // console.log('get html');
            // const html = await page.$eval('td.result', e => e.outerHTML);
            // // console.log('html:', html);
            // // console.log("set result");
            // ID_LIST[0].result = html.includes('맞았습니다!!') ? 20 : html.includes('틀렸습니다') ? 10 : 0;
            ID_LIST[0].result = ac;
            console.log('----------', 'paral:', flag, 'push result');
            let insert = ID_LIST.shift();
            insert.status = returnData;
            assignment_Result.push(insert);
            // console.log("rere at result:", assignment_Result);
            console.log('----------', 'paral:', flag, '\t\t', processID, 'is', insert.result);
            isFinish(ID_LIST, pID, deadLine, assignment_Result, flag);
        })
        .catch(error => {
            console.log('----------', 'paral:', flag, 'html include err', error);
            console.log('----------', 'paral:', flag, '\t\t', processID, "isn't solve");
            ID_LIST[0].result = 0;
            ID_LIST[0].status = '';
            assignment_Result.push(ID_LIST.shift());
            isFinish(ID_LIST, pID, deadLine, assignment_Result, flag);
        });
}

async function isFinish(ID_LIST, pID, deadLine, assignment_Result, flag) {
    console.log('----------', 'paral:', flag, '3. isFinish');
    // console.log("rere at isFin:", assignment_Result);
    parallelizationControl[flag].waitNotify.notify();
    parallelizationControl[flag].AsyncTaskExecute = false;
    if (ID_LIST.length === 0) {
        // console.log("result: ", assignment_Result);
        parallelizationControl[flag].fin = true;
        if (parallelizationControl[0].fin & parallelizationControl[1].fin) {
            AssignTaskExecute_Assignment_All_Task = false;
            waitNotify_Assignment_All_Task.notify();
        }
    } else {
        console.log('—————————————————————————————————————————————————————————');
        console.log(assignment_Result[assignment_Result.length - 1]);
        while (ID_LIST[0].bojid === '-') {
            console.log('----------', 'paral:', flag, ID_LIST[0].ID, 'is unsubmitted');
            ID_LIST.shift();
        }
        // console.log("isFin > run", assignment_Result);
        run(ID_LIST, pID, deadLine, assignment_Result, flag);
    }
}

async function checkResult(pid, lectureid, deadLine) {
    console.log('!——————————check result existence...');
    let sql = 'select * from assignment_result where id=' + pid + ' and lectureid=' + lectureid + ' and deadline=' + deadLine +';';
    console.log(sql);
    try {
        connection.query(sql, async function (err, result, fields) {
            if (err) {
                console.log('!---err in select', err);
            } else {
                console.log('!---select success!');
                if (result.length > 0) {
                    console.log('result is exist.——————————!', result);
                    console.log(re_asyncReturn);
                    assignment_Result = JSON.parse(result[0].result);

                    // console.log('notify at check', assignment_Result.length);

                    re_asyncReturn = false;
                    re_waitReturn.notify();
                } else {
                    console.log('result is not exist.——————————!');
                    assignment_Result = [];
                    re_asyncReturn = false;
                    re_waitReturn.notify();
                }
            }
        });
    } catch (err) {
        console.log('err——————————!', err);
        re_asyncReturn = false;
        re_waitReturn.notify();
    }
}
/* --------------- Assignments Part --------------- */
