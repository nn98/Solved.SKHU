#### BackUp-server.js
```javascript
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

// cors 사용하여 정보 받는 것 우회하기
app.use(cors());

// JSON과 URL-encoded 외에도 해석할 수 있도록 해주기
app.use(bodyParser.json());

// app.get('/', (req, res) => res.send('Hello World2!'))

app.listen(port, () => {
  console.log(`express is  ${port}`);
});

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "54.180.98.222",
  user: "Project",
  password: "testing00",
  database: "SWP",
  multipleStatements: true,
});

connection.connect(() => {
  console.log("connecting");
});

// QnA api @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
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

// Qna 값 출력
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

// QnaInner 값 출력
app.get("/QnAInner", (req, res) => {
  const sql = "SELECT * FROM Qnainner";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("QnA안에꺼 출력");
    res.send(result);
  });
});

//Qna 추가
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
        // console.log(result)
        res.redirect("/QnA");
      });
    }
  });
});

// QnaInner 추가
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
        // console.log(result)
        res.redirect("/QnAInner");
      });
    }
  });
});

// Qna 삭제
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

// QnaInner 삭제
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

//
//
//
//
//
//
// 기타 api @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

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

// Recommend - User

app.post("/rating", async (req, res) => {
  let i, j;
  console.log("rating-post: call",req.body.ID);
  const sqls1 = [
    "",
    "",

    'select * from User where skhurank = (select skhurank from User where ID="' +
      req.body.ID +
      '")-2 union ',
    'select * from User where skhurank = (select skhurank from User where ID="' +
      req.body.ID +
      '")-1 union ',
    'select * from User where skhurank = (select skhurank from User where ID="' +
      req.body.ID +
      '") union ',
    'select * from User where skhurank = (select skhurank from User where ID="' +
      req.body.ID +
      '")+1 union ',
    'select * from User where skhurank = (select skhurank from User where ID="' +
      req.body.ID +
      '")+2 ',

    ";",
  ];
  const query1 = "select max(skhurank) as mSkhurank from User;";
  const sqls = [
    'select skhurank from User where ID ="' + req.body.ID + '";',
    "select PROBLEM_ID, namekr, SOLVED_RANK ,count(PROBLEM_ID) as sum from User right join Solve on User.ID = Solve.USER_ID" +
      " join Problem on Solve.PROBLEM_ID = Problem.ID where User.ID in (",

    'select ID from User where skhurank = (select skhurank from User where ID="' +
      req.body.ID +
      '")-2 union ',

    'select ID from User where skhurank = (select skhurank from User where ID="' +
      req.body.ID +
      '")-1 union ',

    'select ID from User where skhurank = (select skhurank from User where ID="' +
      req.body.ID +
      '")+1 union ',
    'select ID from User where skhurank = (select skhurank from User where ID="' +
      req.body.ID +
      '")+2) ',

    'and PROBLEM_ID not in(select PROBLEM_ID from Solve where USER_ID = "' +
      req.body.ID +
      '")' +
      "group by PROBLEM_ID having count(PROBLEM_ID)>=1 order by count(PROBLEM_ID) desc;",
  ];
  connection.query(sqls[0], function (err, result, fields) {
    if (err) console.log("@@@@@" + err);
    for (let data of result) {
      i = data.skhurank;
    }
    console.log("i", i);
  });
  connection.query(query1, req.body, function (err, result, fields) {
    if (err) console.log(err);
    for (let data of result) {
      j = data.mSkhurank;
    }
    console.log("j", j);
    mAsyncTaskExecute = false;
    waitNotify3.notify();
  });
  AssignTaskExecute = true;
  if (AssignTaskExecute) await waitNotify3.wait();
  // 사용해야 함
  let k = Number(Number(5) - i < Number(2) ? Number(2) : Number(5) - i);
  console.log("k: ", k);
  
  let problems = sqls[1];
  let users = sqls1[1];
  for (k; (k <= j - i + 3) & (k < 6); k++) {
    // console.log('sqls: ', sqls[k])
    problems += sqls[k];
    users += sqls1[k];
  }
  problems += sqls[sqls.length - 1];
  users += sqls1[sqls1.length - 2];
  users += sqls1[sqls1.length - 1];
  // console.log(problems+"\n")
  // console.log(users)

  connection.query(problems + users, req.body, function (err, result, fields) {
    if (err) {
      console.log("@@@@@@@@@@@@@@@@@\n" + err);
      res.send({ error: err.errno });
    } else {
      console.log("rating-post: return Problems/Similar Users",result)
      res.send(result);
    }
  });
});

// rank.js가 서버에게 요청한 데이터를 받을 코드
// "/ranking" 서브스트링을 사용하는 방식이 하나밖에 없기 때문에 rank.js는 get방식을 생략할 수 있음

app.get("/ranking", (req, res) => {
  const sql = "select * from User order by skhurank"; // 요청한 값을 받기 위해 mysql에서 사용할 sql문을 같이 보냄
  connection.query(sql, function (err, result, fields) {
    // if문은 에러 출력을 위한 코드
    if (err) throw err;
    // result는 가져온 결과값
    // console.log(result)
    // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음

    res.send(result);
  });
});
// 알고리즘(많이 푼 문제 10개)
app.get("/MaxAlgorithm", (req, res) => {
  // 요청한 값을 받기 위해 mysql에서 사용할 sql문을 같이 보냄
  const sql =
    "select SOLVED_RANK, ID, namekr, rate, count(PROBLEM_ID) as sum from Solve join Problem on Solve.PROBLEM_ID = Problem.ID group by PROBLEM_ID having count(PROBLEM_ID) order by count(PROBLEM_ID) desc limit 0,10;";

  connection.query(sql, function (err, result, fields) {
    // if문은 에러 출력을 위한 코드
    if (err) throw err;
    // result는 가져온 결과값
    console.log(result);
    // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음

    res.send(result);
  });
});

// 알고리즘(적게 푼 문제 10개)
app.get("/MinAlgorithm", (req, res) => {
  // 요청한 값을 받기 위해 mysql에서 사용할 sql문을 같이 보냄
  const sql =
    "select SOLVED_RANK, ID, namekr, rate, count(PROBLEM_ID) as sum from Solve join Problem on Solve.PROBLEM_ID = Problem.ID group by PROBLEM_ID having count(PROBLEM_ID) order by count(PROBLEM_ID) asc limit 0,10;";
  connection.query(sql, function (err, result, fields) {
    // if문은 에러 출력을 위한 코드
    if (err) throw err;
    // result는 가져온 결과값
    console.log(result);
    // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음

    res.send(result);
  });
});

// 알고리즘(성공률 상위 10개)
app.get("/BestAlgorithm", (req, res) => {
  const sql =
    "select ID,namekr, rate, SOLVED_RANK from Problem where ID in (select PROBLEM_ID from Solve) and namekr regexp '^[가-힇 % %]*$' order by cast(rate as signed) desc limit 0,10; "; // 요청한 값을 받기 위해 mysql에서 사용할 sql문을 같이 보냄
  connection.query(sql, function (err, result, fields) {
    // if문은 에러 출력을 위한 코드
    if (err) throw err;
    // result는 가져온 결과값
    console.log(result); // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음

    res.send(result);
  });
});

// 알고리즘(성공률 하위 10개)
app.get("/WorstAlgorithm", (req, res) => {
  const sql =
    "select ID,namekr, rate, SOLVED_RANK from Problem where ID in (select PROBLEM_ID from Solve) and namekr regexp '^[가-힇 % %]*$' order by cast(rate as signed) limit 0,10; "; // 요청한 값을 받기 위해 mysql에서 사용할 sql문을 같이 보냄
  connection.query(sql, function (err, result, fields) {
    // if문은 에러 출력을 위한 코드
    if (err) throw err;
    // result는 가져온 결과값
    console.log(result);
    // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음

    res.send(result);
  });
});

app.post("/userPage", (req, res) => {
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  console.log(req);
  const b = req.body;
  res.send(b); // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
  //res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.
});

// app.post("/register", (req, res) => {
//   // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
//   console.log(req);
//   const b = req.body;
//   res.send(b); // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
//   //res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.
// });

app.post("/proRegister", (req, res) => {
  console.log("proRegister/post ", "is called");
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  console.log(req);
  const b = req.body;
  console.log(b);
  if (b.pC == "proskhuOp12#") {
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
        (i+1) +
        ");";
      console.log(sql);
      connection.query(sql, function (err, result, fields) {
        // if문은 에러 출력을 위한 코드
        if (err) {
          res
            .status(406)
            .json("에러가 발생했습니다. 입력 내용을 확인해주세요.");
        }
      });

      // result는 가져온 결과값
      // console.log(result);
      // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음
      // res.send(result);
    }
    res.status(200).json("강의 등록이 완료되었습니다.");
  } else {
    res.status(406).json("교수 승인코드가 틀렸습니다.");
  }
  // res.send(b); // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
  //res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.
});

app.get("/studentRegister", (req, res) => {
  console.log("studentRegister/get ", "is called");
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  // console.log(req);
  const b = req.body;
  console.log("body", b);
  res.send(b);
  // //res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.
  // if (b.pC == "stuSK#") {
  //   console.log("Student code is correct");
  //   const sql =
  //     "insert into Student (ID, name, bojid) values(" +
  //     Number(b.sI) +
  //     ", " +
  //     "'" +
  //     b.sN +
  //     "', " +
  //     "'" +
  //     b.bI +
  //     "');";
  //   console.log(sql);
  //   connection.query(sql, function (err, result, fields) {
  //     // if문은 에러 출력을 위한 코드
  //     if (err) {
  //       res
  //         .status(406)
  //         .json({ message: "에러가 발생했습니다. 입력 내용을 확인해주세요" });
  //     }
  //   });

  // result는 가져온 결과값
  // console.log(result);
  // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음
  //   res.status(100).json({ message: "강의 등록이 완료되었습니다" });
  // } else {
  //   res.status(406).json({ message: "교수 승인코드가 틀렸습니다" });
  // }
});

app.post("/studentRegister", async (req, res) => {
  console.log("studentRegister/post ", "is called");
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  const b = req.body;
  let end = false;
  console.log("body", b);
  //res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.
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
    connection.query(sql, function (err, result, fields) {
      // if문은 에러 출력을 위한 코드
      console.log("학생 등록");
      if (err) {
        console.log(
          "res",
          "쿼리 실행이 실패했습니다. 해당 학생이 이미 존재합니다."
        );
        // res.status(406).json('에러가 발생했습니다. 입력 내용을 확인해주세요.')
        // end=true;
      } else {
        console.log("res", "쿼리 실행이 성공했습니다.");
      }
    });

    console.log("stuReg fin");
    AssignTaskExecute = true;
    sql = "insert into Learn values(" + Number(b.sI) + "," + b.lI + ");";
    console.log("수강 등록 쿼리", sql);
    connection.query(sql, function (err, result, fields) {
      // if문은 에러 출력을 위한 코드
      console.log("수강 등록");
      if (err) {
        console.log("res", "쿼리 실행이 실패했습니다.");
        res.status(406).json("에러가 발생했습니다. 이미 수강중인 학생입니다.");
        end = true;
        return;
      } else {
        console.log("res", "쿼리 실행이 성공했습니다.");
      }
      AssignTaskExecute = false;
      waitNotify4.notify();
    });
    if (AssignTaskExecute) await waitNotify4.wait();
    if (end) return;
    res.status(200).json("학생 등록이 완료되었습니다.");
    // result는 가져온 결과값
    // console.log(result);
    // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음
    // res.send(result);
  } else {
    console.log("Student code isnt correct");
    console.log("res", "학생 승인코드가 틀렸습니다.");
    res.status(406).json("학생 승인코드가 틀렸습니다.");
  }
});

// app.get("/algorithm", (req, res) => {
//   const sql = "select * from User"; // 요청한 값을 받기 위해 mysql에서 사용할 sql문을 같이 보냄
//   connection.query(sql, function (err, result, fields) {
//     // if문은 에러 출력을 위한 코드
//     if (err) throw err;
//     // result는 가져온 결과값
//     console.log(result);
//     // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음
//     res.send(result);
//   });
// });

app.get("/assignments", (req, res) => {
  console.log("Assignments/get ", "is called");
  let returnStates;
  let sql =
    "select * from Lecture;" +
    "select ID,name,bojid,Lecture_ID from Student as s join Learn as l on s.ID=l.Student_ID;";
  // 요청한 값을 받기 위해 mysql에서 사용할 sql문을 같이 보냄
  console.log("get Lectures", sql);

  connection.query(sql, function (err, result, fields) {
    // if문은 에러 출력을 위한 코드
    if (err) {
      console.log("error in assignments-get", err);
      throw err;
    }
    // result는 가져온 결과값
    console.log("result:", result);
    console.log("+result to states");
    res.json(result);
    // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음
    // res.send(result);
  });
  // sql =
  // console.log('get Student+Learn', sql);
  // connection.query(sql, function (err, result, fields) {
  //   // if문은 에러 출력을 위한 코드
  //   if (err) {
  //     console.log("get error", err);
  //     throw err;
  //   }
  //   // result는 가져온 결과값
  //   console.log("result:", result);
  //   console.log('+result to states');
  //   returnStates += result;
  //   // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음
  //   // res.send(result);
  //   console.log("res-json", returnStates);
  //   var resultArray = Object.values(JSON.parse(JSON.stringify(returnStates)));
  //   console.log(resultArray);
  //   res.json(returnStates);
  // });
});
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
process.setMaxListeners(50)
app.get('/get', (req, res) => {
  const sql = 'select * from Problem LIMIT 0,10'

  connection.query(sql, function (err, result, fields) {
    if (err) throw err
    console.log(result)
    res.send(result)
  })
})
app.get('/register', (req, res) => {
  const b = req.body;
  const url = 'https://solved.ac/ranking/o/309'
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  // ID, problems, solvedrank, worldrank, skhurank,tier, rating,class,pro,correction
  // addRegister('q9922000',url)
  console.log(b)
  res.send(b) // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
  //res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.
})
app.post('/register', async (req, res) => {
  const url = 'https://solved.ac/ranking/o/309'
  const b = req.body;
  let errOcc=false;
  console.log(b) 
  let resul = []
  let abc;
  console.log('check student code');
  if(b.rC!=="stuSK#"){
    res.status(406).json("학생 승인코드가 틀렸습니다.");
    return;
  }
  AssignTaskExecute = true;
console.log('\t\tsuccess.');
  let sqls = "select * from User where ID = \""+b.uI+"\"";
  console.log('check database code');
  console.log('run conntion',sqls)

  if(errOcc)return;

  connection.query(sqls, async function (err, result, fields) {
    console.log(result.length===0)
    if(result.length===0){
      console.log("User 데이터베이스에 해당 학생 없음. 등록 가능")
    }else{
      console.log('send response',"에러가 발생했습니다. 이미 존재하는 학생입니다.");
    res.status(406).json("에러가 발생했습니다. 이미 존재하는 학생입니다.")
      AssignTaskExecute = false;
      waitNotify5.notify();
      errOcc = true;
    }
    });
    addRegister(b.uI,url);
      if (AssignTaskExecute) await waitNotify5.wait();
      console.log(errOcc)
      if(errOcc)return;
    
  // 코드 stuSK# 
  // 입력받은 유저를 랭킹테이블(데이터베이스)에 추가하는 함수
  async function addRegister(pID,url) {
    
    puppeteer
      .launch({ headless: true })
      .then(async (browser) => {
        const page = await browser.newPage()
        
        await page.goto(url, { waitUntil: 'networkidle2' })
        const content = await page.content();
          // $에 cheerio를 로드한다.
          const $ = cheerio.load(content);
          // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
          const lists = $("tr");
          
          // console.log(lists);
          // 모든 리스트를 순환한다.
          let name = []
          let c = []
          let d = []
          
          lists.each((index, list) => {
              name = $(list).find("td").toString();
              
              
              console.log(name.includes(b.uI));
              if(name.includes(b.uI)===true){
                c = name;
                d  = c.split("</td>");
              }
          });
          abc = $(c).find("img").toString();

          for(let e = 0;e<d.length;e++){
            resul[e] = d[e].replace(/(<([^>]+)>)|&nbsp;/ig, "")
        }     
        console.log('resul',resul)
        if(resul.length===0){
          errOcc=true;
        console.log('err in solved.ac')
        AssignTaskExecute = false
          waitNotify5.notify()
          res.status(406).json("Solved.ac에서 해당 ID를 찾을 수 없습니다. 등록 후 시도해주세요")
          return
        }
        console.log('suc in solved.ac')
          AssignTaskExecute = false
          waitNotify5.notify()
          
      })
    
      
      .catch((error) => {
        errOcc=true;
        console.log('err in solved.ac',error)
        AssignTaskExecute = false
          waitNotify5.notify()
        res.status(406).json("Solved.ac에서 해당 ID를 찾을 수 없습니다. 등록 후 시도해주세요")
      })
  }
  let name2 = []
  let pages = 1;
  let d2 = []
  let resul2 = []
  // 입력받은 유저의 정답률을 크롤링하는 함수
  async function addCorrection(pID,url) {
    console.log('addCorrection is run_to:',url);
  
    puppeteer
      .launch({ headless: true })
      .then(async (browser) => {
        if (mAsyncTaskExecute) {
          await waitNotify.wait()
        }
        mAsyncTaskExecute = true
        const page = await browser.newPage()
        
        await page.goto(url, { waitUntil: 'networkidle2' })
        const content = await page.content();
          // $에 cheerio를 로드한다.
          const $ = cheerio.load(content);
          // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
          const lists2 = $("tr");
          // const a= []
          // console.log(lists);
          // 모든 리스트를 순환한다.
          let c2 = []
          console.log(lists2.toString())
          lists2.each((index, list) => {
              name2 = $(list).find("td").toString();
              // console.log(name2)
              // console.log(index);
              // console.log(name)
              if(name2.includes(b.uI)===true){
                c2 = name2;
                d2  = c2.split("</td>");
              }
          });
          console.log(pages)
          // console.log(c2===undefined)
          for(let e = 0;e<d2.length;e++){
            resul2[e] = d2[e].replace(/(<([^>]+)>)|&nbsp;/ig, "")
        }        

          AssignTaskExecute = false
          waitNotify5.notify();
          
      })
      
      .catch((error) => {
          console.log(error)
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
    console.log(worldrank+" "+skhurank+" "+userid+" "+rating+" "+classs+" "+problems+" "+bojid)
    tier = abc.split('<img src="https://static.solved.ac/tier_small/')[1].split('.svg"')[0];
    console.log('hello')
    corr=undefined;
    while(corr===undefined){
      AssignTaskExecute = true;
      addCorrection(b.uI,'https://www.acmicpc.net/school/ranklist/309/'+pages);
      if (AssignTaskExecute) await waitNotify2.wait();
    corr = resul2[resul2.length-2];
    console.log('corr:',corr)
    pages++;
    }
    console.log(userid+'",'+problems+','+tier+',"'+worldrank+'",'+skhurank+','+rating+',"'+classs+'","'+corr)
    const sql = 'insert into User values("'
    +userid+'",'+problems+','+tier+',"'+worldrank+'",'+skhurank+','+rating+',"'+classs+'","'+corr+'","'+bojid+'");'
    console.log(sql);
    // 등록될 학생을 DB에 넣는 과정
    connection.query(sql, async function (err, result, fields) {
      if (err) {
        console.log('err in insert',err);
        res.status(406).json("error")
      }
      res.status(200).json("학생 등록이 완료되었습니다. 새로고침 후 이용해주시기 바랍니다.")
      });
});

// req는 소스코드로부터 받은 서버로 보낼 JSON 파일이 담긴 요청, res는 서버가 보낸 응답정보를 저장한 객체이고 우리는 JSON 파일 형식을 사용할 것임
app.post("/assignments", async (req, res) => {
  console.log("Assignments/post ", "is called");
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  // const b = req.body
  console.log(req.body);

  // console.log('Default\tID_LIST', ID_LIST)
  console.log("Req\tID_LIST", req.body.ID_LIST);
  console.log("Problem ID\t", req.body.PID);

  let ID_LIST = req.body.ID_LIST;
  let pID = req.body.PID;
  // Assignment.pID=req.body.pID;
  AssignTaskExecute = true;
  let fuck = [];
  console.log("rere at post:", fuck);
  run(ID_LIST, pID, fuck);
  if (AssignTaskExecute) await waitNotify2.wait();

  console.log("send response: ", fuck);
  res.send(fuck);
});
// res.send(b); // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
//res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.

// connection.end()

/* Assignment Part - 2022-05-19 */

// let pID = 1085
// let processID
// let results = []
let mAsyncTaskExecute = false;
let urls = [
  "https://www.acmicpc.net/status?problem_id=",
  "&user_id=",
  "&language_id=-1&result_id=-1",
];

/* Test Data => replace by Req */
// let ID_LIST = [
//   'kshyun419',
//   'asas6614',
//   'kwj9294',
//   'skhu1024',
//   'rladnr128',
//   // "yebinac", "idotu", "neck392", "qmffmzpdl", "skl0519"
// ]
/* */
async function run(ID_LIST, pID, fuck) {
  console.log("1. run", fuck);
  console.log("ID_LIST", ID_LIST);
  console.log("pID", pID);
  let processID = ID_LIST[0].bojid;
  let url = urls[0] + pID + urls[1] + processID + urls[2];
  console.log("rere at run:", fuck);
  execute(ID_LIST, pID, processID, url, fuck);
}

async function execute(ID_LIST, pID, processID, url, fuck) {
  console.log("2. execute");
  console.log("rere at execute:", fuck);
  puppeteer
    .launch({ headless: true })
    .then(async (browser) => {
      if (mAsyncTaskExecute) {
        await waitNotify.wait();
      }

      console.log("now process\t", processID);
      mAsyncTaskExecute = true;
      const page = await browser.newPage();

      await page.goto(url, { waitUntil: "networkidle2" });

      const content = await page.content();
      // $에 cheerio를 로드한다.
      const $ = cheerio.load(content);
      let re = [];
      // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
      const lists = $("tr");
      console.log(lists);
      // 모든 리스트를 순환한다.
      let returnData = [];
      lists.each((index, list) => {
        let red = [];
        const name = $(list).find("td");
        // console.log("find:", index, name);
        const name0 = $(list).find("td").toString().split("<td>");
        // console.log("arr:", name0);
        for (let i = 0; ++i < name0.length; ) {
          console.log("N", i, name0[i]);
          if (name0[i].split("</td>").length > 3) {
            let v = name0[i].split("</td>");
            console.log("split:", v);
            for (
              let j = 0;
              j < v.length - 1;
              red.push(v[j++].replace(/(<([^>]+)>)/gi, ""))
            );
          } else {
            // console.log(name0[i]);
            let x = name0[i].lastIndexOf("data-original-title=");
            if (x >= 0) {
              red.push(
                name0[i].split('data-original-title="')[1].split('"')[0]
              );
            }
            console.log("n", i, name0[i].replace(/(<([^>]+)>)/gi, ""));
            red.push(name0[i].replace(/(<([^>]+)>)/gi, ""));
            // returnData.push(name0[i++].replace(/(<([^>]+)>)/ig, ""));
          }
        }
        returnData.push(red);
        // console.log('returnData: ', returnData);
        // if(returnData.length>0)reDatas.push(returnData);
        // for(let i=0;i<name0.length;console.log("n",i,name0[i++].match(/(?<=\<[tT][dD]\>).*(?=\<\/[tT][dD]\>)/),""
        // .match(/(?<=\<[aA]\>).*(?=\<\/[aA]\>)/),""));
        // console.log(name[1].match(/(?<=\<[a-Z][a-Z][a-Z]\>).*(?=\<\/[a-Z][a-Z][a-Z]\>)/));c
        // console.log(name[1].match(/(?<=\<)/));
        // name0.forEach(e=>console.log(e.match(/(?<=\<[a-Z][a-Z][a-Z]\>).*(?=\<\/[a-Z][a-Z][a-Z]\>)/)));
        // console.log("text:",index, name0);
        // console.log(name);
        // re.push(name);
        // console.log(name0);
        // 인덱스와 함께 로그를 찍는다.
        // console.log({
        //     index, name
        // });
      });

      console.log('get html');
      const html = await page.$eval("td.result", (e) => e.outerHTML);
      console.log('html:',html);
      console.log("set result");
      ID_LIST[0].result = html.includes("맞았습니다!!")
        ? 20
        : html.includes("틀렸습니다")
        ? 10
        : 0;
      // ID_LIST[0].status=status;
      // ID_LIST[0].status = status;
      // status good
      // console.log("!status : ",status);
      console.log("push result");
      let insert = ID_LIST.shift();
      insert.status = returnData;
      fuck.push(insert);
      console.log("rere at result:", fuck);
      // fuck.push(status);
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
  console.log("rere at isFin:", fuck);
  waitNotify.notify();
  mAsyncTaskExecute = false;
  if (ID_LIST.length == 0) {
    console.log("result: ", fuck);
    AssignTaskExecute = false;
    waitNotify2.notify();
    // process.exit(0);
  } else {
    console.log("————————————————————————————————————");
    console.log("isFin > run", fuck);
    run(ID_LIST, pID, fuck);
  }
}
```
