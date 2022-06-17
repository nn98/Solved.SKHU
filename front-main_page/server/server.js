// npm i wait-notify puppeteer cheerio
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const WaitNotify = require("wait-notify");
const waitNotify = new WaitNotify();
const waitNotify2 = new WaitNotify();
const waitNotify3 = new WaitNotify();
const waitNotify4 = new WaitNotify();
const waitNotify5 = new WaitNotify();

let AssignTaskExecute = false;
let AssignTaskExecute1 = false;
let AssignTaskExecute2 = false;
let AssignTaskExecute3 = false;
let AssignTaskExecute4 = false;
let AssignTaskExecute5 = false;

app.use(cors());

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`express is  ${port}`);
});

var mysql = require("mysql");
var connection = mysql.createPool({
  host: "54.180.80.37",
  user: "Project",
  password: "testing00",
  database: "SWP",
  multipleStatements: true,
  charset : 'utf8mb4',
  connectionLimit: 30
});

connection.getConnection(() => {
  console.log("connecting");
});

app.post("/QnAUser", (req, res) => {
  const sql = "INSERT INTO Qnauser SET ?";
  connection.query(sql, req.body, function (err, result, fields) {
    if (err) {
      res.send({ error: err.errno });
    } else {
      console.log(result);
      res.send({ data: "어서오세요" });
    }
  });
});

app.get("/QnA", (req, res) => {
  const sql = "SELECT * FROM Qna  ORDER BY createdat DESC";

  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("QnA 출력");
    res.send(result);
  });
});

app.get("/QnAProblem", (req, res) => {
  const sql = "select distinct PROBLEM_ID from Solve;";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("QnA문제 출력");
    res.send(result);
  });
});

app.get("/QnAInner", (req, res) => {
  const sql = "SELECT * FROM Qnainner";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("QnA안에꺼 출력");
    res.send(result);
  });
});

app.post("/QnAAdd", (req, res) => {
  const userBody = [req.body.userId, req.body.password];
  const userSql =
    "SELECT * FROM Qnauser WHERE Qnauser.name = ? and Qnauser.password = ?;";
  connection.query(userSql, userBody, function (err, result, fields) {
    if (err) throw err;

    if (result.length === 0) {
      res.send({ error: "사용자가 올바르지 않습니다." });
    } else {
      const insertBody = [
        req.body.content,
        req.body.userIP,
        req.body.userId,
        req.body.problem,
      ];
      const insertSql =
        "INSERT INTO Qna(content, userip, USER_ID, problem) value (?,?,?,?);";
      connection.query(insertSql, insertBody, function (err, result, fields) {
        if (err) throw err;
        console.log("QnA 더하기");
        res.redirect("/QnA");
      });
    }
  });
});

app.post("/QnAInnerAdd", (req, res) => {
  const userBody = [req.body.userId, req.body.password];
  const userSql =
    "SELECT * FROM Qnauser WHERE Qnauser.name = ? and Qnauser.password = ?;";
  connection.query(userSql, userBody, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) {
      res.send({ error: "사용자가 올바르지 않습니다." });
    } else {
      const insertBody = [
        req.body.content,
        req.body.userIP,
        req.body.userId,
        req.body.qnaId,
      ];
      const insertSql =
        "INSERT INTO Qnainner(content, userip, USER_ID, QNA_ID) value (?,?,?,?);";
      connection.query(insertSql, insertBody, function (err, result, fields) {
        if (err) throw err;
        console.log("QnA안에꺼 더하기");
        res.redirect("/QnAInner");
      });
    }
  });
});

app.post("/QnADelete", (req, res) => {
  const userBody = [req.body.userId, req.body.password];
  const userSql =
    "SELECT * FROM Qnauser WHERE Qnauser.name = ? and Qnauser.password = ?;";
  connection.query(userSql, userBody, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) {
      res.send({ error: "사용자가 올바르지 않습니다." });
    } else {
      const deleteBody = [req.body.ID, req.body.userId];
      const deleteSql = "DELETE FROM Qna WHERE Qna.ID = ? and Qna.USER_ID = ?;";
      connection.query(deleteSql, deleteBody, function (err, result, fields) {
        if (result.affectedRows === 0) {
          res.send({ error: "사용자가 올바르지 않습니다." });
        } else {
          console.log("QnA 삭제");
          res.redirect("/QnA");
        }
      });
    }
  });
});

app.post("/QnAInnerDelete", (req, res) => {
  const userBody = [req.body.userId, req.body.password];
  const userSql =
    "SELECT * FROM Qnauser WHERE Qnauser.name = ? and Qnauser.password = ?;";
  connection.query(userSql, userBody, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) {
      res.send({ error: "사용자가 올바르지 않습니다." });
    } else {
      const deleteBody = [req.body.ID, req.body.userId];
      const deleteSql =
        "DELETE FROM Qnainner WHERE Qnainner.ID = ? and Qnainner.USER_ID = ?;";
      connection.query(deleteSql, deleteBody, function (err, result, fields) {
        if (result.affectedRows === 0) {
          res.send({ error: "사용자가 올바르지 않습니다." });
        } else {
          console.log("QnA안에꺼 삭제");
          res.redirect("/QnAInner");
        }
      });
    }
  });
});

app.post("/addRegister", (req, res) => {
  const sql = "";
});

app.get("/get", (req, res) => {
  const sql = "select * from Problem LIMIT 0,10";

  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/rating", async (req, res) => {
  let i;
  console.log("rating-post: call", req.body.ID);
  const sqls = [
    // 'select skhurank from User where ID ="' + req.body.ID + '";',
    "select PROBLEM_ID, namekr, SOLVED_RANK ,count(PROBLEM_ID) as sum from User right join Solve on User.ID = Solve.USER_ID" +
    " join Problem on Solve.PROBLEM_ID = Problem.ID where User.ID in (",

    'select ID from User where skhurank = (select skhurank from User where ID="' +
    req.body.ID +
    '")-2 ',

    'union select ID from User where skhurank = (select skhurank from User where ID="' +
    req.body.ID +
    '")-1 union ',

    'select ID from User where skhurank = (select skhurank from User where ID="' +
    req.body.ID +
    '")+1 ',
    'union select ID from User where skhurank = (select skhurank from User where ID="' +
    req.body.ID +
    '")+2) ',

    'and PROBLEM_ID not in(select PROBLEM_ID from Solve where USER_ID = "' +
    req.body.ID +
    '")' +
    "group by PROBLEM_ID having count(PROBLEM_ID)>=1 order by count(PROBLEM_ID) desc;"
    // ")"
  ];
  const sqls1 = [
    // "",
    "",
    'select * from User where skhurank = (select skhurank from User where ID="' +
    req.body.ID +
    '")-2 ',
    'union select * from User where skhurank = (select skhurank from User where ID="' +
    req.body.ID +
    '")-1 union ',
    'select * from User where skhurank = (select skhurank from User where ID="' +
    req.body.ID +
    '") ',
    'union select * from User where skhurank = (select skhurank from User where ID="' +
    req.body.ID +
    '")+1 ',
    'union select * from User where skhurank = (select skhurank from User where ID="' +
    req.body.ID +
    '")+2; ',
    // ")",
    // ";",
  ];
  const query1 = "select skhurank from User where ID = \""+req.body.ID+"\";";
  
  AssignTaskExecute3 = true;
  connection.query(query1, async function (err, result, fields) {
    if (err) console.log("@@@@@" + err);
    for (let data of result) {
      i = data.skhurank;
    }
    console.log("i", i);
    AssignTaskExecute3 = false;
    waitNotify3.notify();
  });
  if (AssignTaskExecute3) await waitNotify3.wait();
  AssignTaskExecute3 = true;
  let problems = ""
  let users = ""
  if(i===1){
    problems += sqls[0];
    users += sqls1[0];
    for (let k = 3;k<sqls.length;k++) {
      problems += sqls[k];
      users += sqls1[k];
    }
  }else{
    for (let k = 0;k<sqls.length;k++) {
      problems += sqls[k];
      users += sqls1[k];
    }
  }
  // connection.query(query1, req.body, function (err, result, fields) {
  //   if (err) console.log(err);
  //   for (let data of result) {
  //     j = data.mSkhurank;
  //   }
  //   console.log("j", j);
  //   AssignTaskExecute3 = false;
  //   waitNotify3.notify();
  // });
  // if (AssignTaskExecute3) await waitNotify3.wait();
  // let k = Number(Number(5) - i < Number(2) ? Number(2) : Number(5) - i);
  // console.log("k: ", k);

  
  
  // problems += sqls[sqls.length - 1];
  // problems += sqls[sqls.length - 2];

  // users += sqls1[sqls1.length-4];
  // users += sqls1[sqls1.length-3];
  // users += sqls1[sqls1.length - 2];
  // users += sqls1[sqls1.length - 1];
  AssignTaskExecute3 = true;
  console.log("SQL-problems:",problems);
  console.log("SQL-users:",users);
  connection.query(problems + users, req.body, function (err, result, fields) {
    if (err) {
      console.log("@@@@@@@@@@@@@@@@@\n" + err);
      res.send({ error: err.errno });
    } else {
      console.log("rating-post: return Problems/Similar Users", result)
      res.send(result);
    }
    AssignTaskExecute3 = false;
    waitNotify3.notify();
  });
  if (AssignTaskExecute3) await waitNotify3.wait();
});

app.get("/ranking", (req, res) => {
  const sql = "select * from User order by skhurank";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;

    res.send(result);
  });
});
app.get("/MaxAlgorithm", (req, res) => {
  const sql =
    "select SOLVED_RANK, ID, namekr, rate, count(PROBLEM_ID) as sum from Solve join Problem on Solve.PROBLEM_ID = Problem.ID group by PROBLEM_ID having count(PROBLEM_ID) order by count(PROBLEM_ID) desc limit 0,10;";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.get("/MinAlgorithm", (req, res) => {
  const sql =
    "select SOLVED_RANK, ID, namekr, rate, count(PROBLEM_ID) as sum from Solve join Problem on Solve.PROBLEM_ID = Problem.ID group by PROBLEM_ID having count(PROBLEM_ID) order by count(PROBLEM_ID) asc limit 0,10;";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.get("/BestAlgorithm", (req, res) => {
  const sql =
    "select ID,namekr, rate, SOLVED_RANK from Problem where ID in (select PROBLEM_ID from Solve) and namekr regexp '^[가-힇 % %]*$' order by cast(rate as signed) desc limit 0,10; ";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.get("/WorstAlgorithm", (req, res) => {
  const sql =
    "select ID,namekr, rate, SOLVED_RANK from Problem where ID in (select PROBLEM_ID from Solve) and namekr regexp '^[가-힇 % %]*$' order by cast(rate as signed) limit 0,10; ";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/userPage", (req, res) => {
  console.log(req);
  const b = req.body;
  res.send(b);
});

app.post("/proRegister", (req, res) => {
  console.log("proRegister/post ", "is called");
  console.log(req);
  const b = req.body;
  console.log(b);
  if (b.pC === "proskhuOp12#") {
    for (let i = 0; i < b.cN; i++) {
      const sql =
        "insert into Lecture (professor, code, name, distribution) values(" +
        "'" +
        b.pN +
        "', " +
        "'" +
        b.sC +
        "', " +
        "'" +
        b.sN +
        (b.cN < 2 ? "" : "-0" + (i + 1)) +
        "', " +
        (i + 1) +
        ");";
      console.log(sql);
      connection.query(sql, function (err, result, fields) {
        if (err) {
          res
            .status(406)
            .json("에러가 발생했습니다. 입력 내용을 확인해주세요.");
        }
      });
    }
    res.status(200).json("강의 등록이 완료되었습니다.");
  } else {
    res.status(406).json("교수 승인코드가 틀렸습니다.");
  }
});

app.get("/studentRegister", (req, res) => {
  console.log("studentRegister/get ", "is called");
  const b = req.body;
  console.log("body", b);
  res.send(b);
});

app.post("/studentRegister", async (req, res) => {
  console.log("studentRegister/post ", "is called");
  const b = req.body;
  let end = false;
  console.log("body", b);
  if (b.sC == "stuSK#") {
    console.log("Student code is correct");
    let sql =
      "insert into Student (ID, name, bojid) values(" +
      Number(b.sI) +
      ", " +
      "'" +
      b.sN +
      "', " +
      "'" +
      b.bI +
      "');";
    console.log("학생 등록 쿼리 시작", sql);
    AssignTaskExecute4 = true;
    connection.query(sql, async function (err, result, fields) {
      console.log("학생 테이블 존재 여부 확인");
      if (err) {
        console.log(
          "res",
          "쿼리 실행이 실패했습니다. 해당 학생이 이미 존재합니다."
        );
        AssignTaskExecute4 = false;
        waitNotify4.notify();
      } else {
        console.log("res", "쿼리 실행이 성공했습니다. 신규 학생입니다.");
      }
      AssignTaskExecute4 = false;
      waitNotify4.notify();
    });
    if (AssignTaskExecute4) await waitNotify4.wait();

    console.log("존재 여부 확인 완료.");
    AssignTaskExecute4 = true;
    sql = "insert into Learn values(" + Number(b.sI) + "," + b.lI + ");";
    console.log("수강 등록 쿼리", sql);
    connection.query(sql, async function (err, result, fields) {
      console.log("수강 등록");
      if (err) {
        console.log("res", "쿼리 실행이 실패했습니다.");
        res.status(406).json("에러가 발생했습니다. 이미 수강중인 학생입니다.");
        end = true;
        return;
      } else {
        console.log("res", "쿼리 실행이 성공했습니다.");
      }
      AssignTaskExecute4 = false;
      waitNotify4.notify();
    });
    if (AssignTaskExecute4) await waitNotify4.wait();
    if (end) return;
    res.status(200).json("학생 등록이 완료되었습니다.");
  } else {
    console.log("Student code isnt correct");
    console.log("res", "학생 승인코드가 틀렸습니다.");
    res.status(406).json("학생 승인코드가 틀렸습니다.");
  }
});

app.get("/assignments", (req, res) => {
  console.log("Assignments/get ", "is called");
  let returnStates;
  let sql =
    "select * from Lecture;" +
    "select ID,name,bojid,Lecture_ID from Student as s join Learn as l on s.ID=l.Student_ID;";
  console.log("get Lectures", sql);

  connection.query(sql, function (err, result, fields) {
    if (err) {
      console.log("error in assignments-get", err);
      throw err;
    }
    console.log("result:", result);
    console.log("+result to states");
    res.json(result);
  });
});

const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
process.setMaxListeners(50)
app.get('/get', (req, res) => {
  const sql = 'select * from Problem LIMIT 0,10';
  connection.query(sql, function (err, result, fields) {
    if (err) throw err
    console.log(result)
    res.send(result)
  })
})
app.post('/register', async (req, res) => {
  const url = 'https://solved.ac/ranking/o/309'
  const b = req.body;
  let errOcc = false;
  console.log(b)
  let resul = []
  let ti;
  console.log('check student code');
  if (b.rC !== "stuSK#") {
    res.status(406).json("학생 승인코드가 틀렸습니다.");
    return;
  }
  AssignTaskExecute2 = true;
  console.log('solved check success');
  let sqls = "select * from User where ID = \"" + b.uI + "\"";
  console.log('run conntion', sqls)

  if (errOcc) return;

  connection.query(sqls, async function (err, result, fields) {
    console.log(result.length === 0)
    if (result.length === 0) {
      console.log("User 데이터베이스에 해당 학생 없음. 등록 가능")
    } else {
      console.log('send response', "에러가 발생했습니다. 이미 존재하는 학생입니다.");
      res.status(406).json("에러가 발생했습니다. 이미 존재하는 학생입니다.")
      AssignTaskExecute2 = false;
      waitNotify5.notify();
      errOcc = true;
    }
  });
  addRegister(b.uI, url);
  if (AssignTaskExecute2) await waitNotify5.wait();
  console.log(errOcc)
  if (errOcc) return;

  // 입력받은 유저를 랭킹테이블(데이터베이스)에 추가하는 함수
  async function addRegister(pID, url) {

    puppeteer
      .launch({ headless: true })
      .then(async (browser) => {
        const page = await browser.newPage()

        await page.goto(url, { waitUntil: 'networkidle2' })
        const content = await page.content();
        const $ = cheerio.load(content);
        const lists = $("tr");

        let name = []
        let c = []
        let d = []

        lists.each((index, list) => {
          name = $(list).find("td").toString();
          if (name.includes(b.uI) === true) {
            c = name;
            d = c.split("</td>");
          }
        });
        ti = $(c).find("img").toString();

        for (let e = 0; e < d.length; e++) {
          resul[e] = d[e].replace(/(<([^>]+)>)|&nbsp;/ig, "")
        }
        if (resul.length === 0) {
          errOcc = true;
          console.log('err in solved.ac')
          AssignTaskExecute2 = false
          waitNotify5.notify()
          res.status(406).json("Solved.ac에서 해당 ID를 찾을 수 없습니다. 등록 후 시도해주세요")
          return
        }
        console.log(resul)
        console.log('suc in solved.ac')
        AssignTaskExecute2 = false
        waitNotify5.notify()

      })
      .catch((error) => {
        errOcc = true;
        console.log('err in solved.ac', error)
        AssignTaskExecute2 = false
        waitNotify5.notify()
        res.status(406).json("솔브드에서 응답하지 않습니다. 잠시후 다시 시도해주세요")
      })
  }

  let name2 = []
  let pages = 1;
  let d2 = []
  let resul2 = []
  // 입력받은 유저의 정답률을 크롤링하는 함수
  async function addCorrection(pID, url) {
    console.log('addCorrection is run_to:', url);

    puppeteer
      .launch({ headless: true })
      .then(async (browser) => {
        const page = await browser.newPage()

        await page.goto(url, { waitUntil: 'networkidle2' })
        const content = await page.content();
        // $에 cheerio를 로드한다.
        const $ = cheerio.load(content);
        // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
        const lists2 = $("tr");
        // 모든 리스트를 순환한다.
        let c2 = []
        lists2.each((index, list) => {
          name2 = $(list).find("td").toString();
          if (name2.includes(b.uI) === true) {
            c2 = name2;
            d2 = c2.split("</td>");
          }
        });
        console.log(pages)
        // console.log(c2===undefined)
        for (let e = 0; e < d2.length; e++) {
          resul2[e] = d2[e].replace(/(<([^>]+)>)|&nbsp;/ig, "")
          console.log(resul2[e])
        }

        AssignTaskExecute2 = false
        waitNotify5.notify();

      })

      .catch((error) => {
        console.log(error);
        AssignTaskExecute2 = false
        waitNotify5.notify();
      })
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
  console.log(worldrank + " " + skhurank + " " + userid + " " + rating + " " + classs + " " + problems + " " + bojid + " " + tier)
  corr = undefined;
  while (corr === undefined) {
    AssignTaskExecute2 = true;
    addCorrection(b.uI, 'https://www.acmicpc.net/school/ranklist/309/' + pages);
    if (AssignTaskExecute2) await waitNotify5.wait();
    corr = resul2[resul2.length - 2];
    console.log('corr:', corr)
    pages++;
  }
  console.log(userid + '",' + problems + ',' + tier + ',"' + worldrank + '",' + skhurank + ',' + rating + ',"' + classs + '","' + corr)
  const sql = 'insert into User values("'
    + userid + '",' + problems + ',' + tier + ',"' + worldrank + '",' + skhurank + ',' + rating + ',"' + classs + '","' + corr + '","' + bojid + '");'
  console.log(sql);
  // 등록할 학생을 DB에 넣는 과정
  connection.query(sql, async function (err, result, fields) {
    if (err) {
      console.log('err in insert', err);
      res.status(406).json("error")
    }
    res.status(200).json("학생 등록이 완료되었습니다. 새로고침 후 이용해주시기 바랍니다.")
  });
  AssignTaskExecute2 = true;
  userUpdate(url, req);
  let updateP = 1;
  while (updateP <= 3) {
    AssignTaskExecute2 = true;
    correctionUpdate('https://www.acmicpc.net/school/ranklist/309/' + updateP)
    if (AssignTaskExecute2) await waitNotify5.wait();
    updateP++;
  }

});
// 전체 학생 정보 업데이트 함수
async function userUpdate(url, req) {

  puppeteer
    .launch({ headless: true })
    .then(async (browser) => {
      const page = await browser.newPage()

      await page.goto(url, { waitUntil: 'networkidle2' })
      const content = await page.content();
      // $에 cheerio를 로드한다.
      const $ = cheerio.load(content);
      // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
      const lists3 = $("tr");
      // 모든 리스트를 순환한다.
      let c3 = []
      let d3 = []
      let name3 = []
      let resul3 = []
      let tiee;
      let worldrank, skhurank, userid, rating, classs, problems, tie, bojid;
      lists3.each((index, lists) => {
        if (index > 0) {
          name3 = $(lists).find("td").toString();
          c3 = name3;
          d3 = c3.split("</td>");
          tiee = $(c3).find("img").toString();
          // console.log(tiee[index].split('.svg"')[0].replace(/[^0-9]/gi,""))
          for (let e = 0; e < d3.length; e++) {
            resul3[e] = d3[e].replace(/(<([^>]+)>)|&nbsp;/ig, "")
          }
          worldrank = resul3[0];
          skhurank = resul3[1];
          userid = resul3[2];
          rating = resul3[3];
          classs = resul3[4];
          problems = resul3[5].replace(",", "");
          tie = tiee.split('.svg"')[0].replace(/[^0-9]/gi, "");
          // console.log(ti);
          bojid = req.body.gI;
          // console.log('worldrank : ',worldrank,'skhurank : ', skhurank,'userid : ', userid,'rating : ', rating,'class : ' ,classs,'problems : ', problems,'tier : ' ,tie,'bojid : ', bojid);
          const sql = "update User set problems = " + problems + ", solvedrank = " + tie + ",worldrank=\"" + worldrank + "\",skhurank=" + skhurank + ",rating=" + rating + ",class=\"" + classs + "\",gitid = \"" + bojid + "\" where ID = \"" + userid + "\";"
          console.log(sql)
          connection.query(sql, async function (err, result, fields) {
            if (err) {
              console.log('err in update', err);
            }
          });
        }
        console.log()

      });
      solvePage("https://solved.ac/profile/" + req.body.uI + "/solved", req.body.uI);
      AssignTaskExecute2 = false
      waitNotify5.notify();
    })
    .catch((error) => {
      console.log(error)
    })
}
async function solvePage(url, userid) {

  puppeteer
    .launch({ headless: true })
    .then(async (browser) => {
      const page = await browser.newPage()
      await page.setDefaultNavigationTimeout(0);
      await page.goto(url, { waitUntil: 'networkidle2' })
      const content = await page.content();
      let solpage = 1;
      const $ = cheerio.load(content);
      const list5 = $("#__next > div > div.css-axxp2y > div > div:nth-child(4) > div.css-18lc7iz");
      const pages = $(list5).find("a").toString()
      let a = pages.split('</a>');
      let b = a[a.length - 2].split(/class="css-af4alp">|class="css-1orliys">/);
      console.log(b[1])
      while (solpage <= b[1]) {
        solveProblem("https://solved.ac/profile/" + userid + "/solved?page=" + solpage++, userid)
      }

      AssignTaskExecute2 = false
      waitNotify5.notify();
    })

    .catch((error) => {
      console.log(error)
    })
}
async function solveProblem(url, userid) {
  puppeteer
    .launch({ headless: true })
    .then(async (browser) => {
      const page = await browser.newPage()
      await page.setDefaultNavigationTimeout(0);
      await page.goto(url, { waitUntil: 'networkidle2' })
      const content = await page.content();
      const $ = cheerio.load(content);
      const lists = $("tr");
      let c5 = []
      let d5 = []
      let name5 = []
      let resul5 = []
      lists.each((index, list) => {
        name5 = $(list).find("td").toString();
        c5 = name5;
        d5 = c5.split("</td>");
        resul5[0] = d5[0].replace(/(<([^>]+)>)|&nbsp;/ig, "")
        const sql = "insert into Solve(USER_ID, PROBLEM_ID) values(\"" + userid + "\",\"" + resul5[0] + "\")"
        console.log(sql)
        try {
          connection.query(sql, async function (err, result, fields) {
            if (err) {
              console.log('err in update', err);
            }
          });
        } catch (error) {
          console.log(error)
        }
      });
      AssignTaskExecute2 = false
      waitNotify5.notify();
    })

    .catch((error) => {
      console.log(error)
    })
}
async function correctionUpdate(url) {
  puppeteer
    .launch({ headless: true })
    .then(async (browser) => {
      const page = await browser.newPage()

      await page.goto(url, { waitUntil: 'networkidle2' })
      const content = await page.content();
      // $에 cheerio를 로드한다.
      const $ = cheerio.load(content);
      // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
      const lists4 = $("tr");
      // 모든 리스트를 순환한다.
      let c4 = []
      let d4 = []
      let name4 = []
      let resul4 = []
      let id;
      let correction;
      lists4.each((index, list) => {
        name4 = $(list).find("td").toString();
        c4 = name4;
        d4 = c4.split("</td>");
        for (let e = 0; e < d4.length; e++) {
          resul4[e] = d4[e].replace(/(<([^>]+)>)|&nbsp;/ig, "")
        }
        id = resul4[1];
        correction = resul4[resul4.length - 2];
        const sql = "update User set correction = \"" + correction + "\" where ID = \"" + id + "\";"
        console.log(sql)
        connection.query(sql, async function (err, result, fields) {
          if (err) {
            console.log('err in update', err);
          }
        });
      });
      // console.log(pages)
      // console.log(c2===undefined)


      AssignTaskExecute2 = false
      waitNotify5.notify();

    })

    .catch((error) => {
      console.log(error)
    })
}


app.post("/assignments", async (req, res) => {
  console.log("Assignments/post ", "is called");
  console.log(req.body);

  console.log("Req\tID_LIST", req.body.ID_LIST);
  console.log("Problem ID\t", req.body.PID);

  let ID_LIST = req.body.ID_LIST;
  let pID = req.body.PID;
  AssignTaskExecute = true;
  let fuck = [];
  console.log("rere at post:", fuck);
  run(ID_LIST, pID, fuck);
  if (AssignTaskExecute) await waitNotify2.wait();

  console.log("send response: ", fuck);
  res.send(fuck);
});
let mAsyncTaskExecute = false;
let urls = [
  "https://www.acmicpc.net/status?problem_id=",
  "&user_id=",
  "&language_id=-1&result_id=-1",
];

async function run(ID_LIST, pID, fuck) {
  console.log("1. run");
  // console.log("1. run", fuck);
  // console.log("ID_LIST", ID_LIST);
  console.log("pID", pID);
  let processID = ID_LIST[0].bojid;
  let url = urls[0] + pID + urls[1] + processID + urls[2];
  // console.log("rere at run:", fuck);
  execute(ID_LIST, pID, processID, url, fuck);
}

async function execute(ID_LIST, pID, processID, url, fuck) {
  console.log("2. execute");
  // console.log("rere at execute:", fuck);
  puppeteer
    .launch({ headless: true })
    .then(async (browser) => {
      if (mAsyncTaskExecute) {
        await waitNotify.wait();
      }

      console.log("now process\t", processID);
      mAsyncTaskExecute = true;
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto(url, { waitUntil: "networkidle2" ,timeout: 0});

      const content = await page.content();
      const $ = cheerio.load(content);
      let re = [];
      const lists = $("tr");
      // console.log(lists);
      let returnData = [];
      lists.each((index, list) => {
        let red = [];
        const name = $(list).find("td");
        const name0 = $(list).find("td").toString().split("<td>");
        for (let i = 0; ++i < name0.length;) {
          // console.log("N", i, name0[i]);
          if (name0[i].split("</td>").length > 3) {
            let v = name0[i].split("</td>");
            // console.log("split:", v);
            for (
              let j = 0;
              j < v.length - 1;
              red.push(v[j++].replace(/(<([^>]+)>)/gi, ""))
            );
          } else {
            let x = name0[i].lastIndexOf("data-original-title=");
            if (x >= 0) {
              red.push(
                name0[i].split('data-original-title="')[1].split('"')[0]
              );
            }
            // console.log("n", i, name0[i].replace(/(<([^>]+)>)/gi, ""));
            red.push(name0[i].replace(/(<([^>]+)>)/gi, ""));
          }
        }
        returnData.push(red);
      });

      // console.log('get html');
      const html = await page.$eval("td.result", (e) => e.outerHTML);
      // console.log('html:', html);
      // console.log("set result");
      ID_LIST[0].result = html.includes("맞았습니다!!")
        ? 20
        : html.includes("틀렸습니다")
          ? 10
          : 0;
      console.log("push result");
      let insert = ID_LIST.shift();
      insert.status = returnData;
      fuck.push(insert);
      // console.log("rere at result:", fuck);
      console.log("\t\t", processID, "is solve");
      isFinish(ID_LIST, pID, fuck);
    })
    .catch((error) => {
      console.log("html include err", error);
      console.log("\t\t", processID, "isn't solve");
      ID_LIST[0].result = 0;
      ID_LIST[0].status = "";
      fuck.push(ID_LIST.shift());
      isFinish(ID_LIST, pID, fuck);
    });
}

async function isFinish(ID_LIST, pID, fuck) {
  console.log("3. isFinish");
  // console.log("rere at isFin:", fuck);
  waitNotify.notify();
  mAsyncTaskExecute = false;
  if (ID_LIST.length === 0) {
    // console.log("result: ", fuck);
    AssignTaskExecute = false;
    waitNotify2.notify();
  } else {
    console.log("————————————————————————————————————");
    console.log(fuck[fuck.length-1]);
    while(ID_LIST[0].bojid==="-"){
      console.log(ID_LIST[0].ID,"is unsubmitted");
      ID_LIST.shift();
    }
    // console.log("isFin > run", fuck);
    run(ID_LIST, pID, fuck);
  }
}
