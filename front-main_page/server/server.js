const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

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
  host: "13.125.213.121",
  user: "Project",
  password: "testing00",
  database: "SWP",
});

connection.connect(() => {
  console.log("connecting");
});

app.get("/get", (req, res) => {
  const sql = "select * from Ranking";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// rank.js가 서버에게 요청한 데이터를 받을 코드
// "/ranking" 서브스트링을 사용하는 방식이 하나밖에 없기 때문에 rank.js는 get방식을 생략할 수 있음
app.get("/ranking", (req, res) => {
  const sql = "select * from Ranking order by skhurank"; // 요청한 값을 받기 위해 mysql에서 사용할 sql문을 같이 보냄
  connection.query(sql, function (err, result, fields) {
    // if문은 에러 출력을 위한 코드
    if (err) throw err;
    // result는 가져온 결과값
    console.log(result);
    // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음
    res.send(result);
  });
});

// req는 소스코드로부터 받은 서버로 보낼 JSON 파일이 담긴 요청, res는 서버가 보낸 응답정보를 저장한 객체이고 우리는 JSON 파일 형식을 사용할 것임
app.post("/assignments", (req, res) => {
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  const b = req.body;
  res.send(b); // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
  //res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.
});

app.post("/userPage", (req, res) => {
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  console.log(req);
  const b = req.body;
  res.send(b); // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
  //res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.
});

app.post("/register", (req, res) => {
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  console.log(req);
  const b = req.body;
  res.send(b); // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
  //res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.
});

app.get("/algorithm", (req, res) => {
  const sql = ""; // 요청한 값을 받기 위해 mysql에서 사용할 sql문을 같이 보냄
  connection.query(sql, function (err, result, fields) {
    // if문은 에러 출력을 위한 코드
    if (err) throw err;
    // result는 가져온 결과값
    console.log(result);
    // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음
    res.send(result);
  });
});
// connection.end()
