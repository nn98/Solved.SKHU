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
  host: "15.164.216.23",
  user: "Project",
  password: "testing00",
  database: "SWP",
});

connection.connect(() => {
  console.log("connecting");
});

app.get("/get", (req, res) => {
  const sql = "select * from User";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
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
    console.log(result);
    // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음
    res.send(result);
  });
});

// req는 소스코드로부터 받은 서버로 보낼 JSON 파일이 담긴 요청, res는 서버가 보낸 응답정보를 저장한 객체이고 우리는 JSON 파일 형식을 사용할 것임
app.post("/assignments", async (req, res) => {
  console.log("Assignments/post ", "is called");
  console.log("Default ID_LIST", ID_LIST);
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  const b = req.body;
  console.log(req.body);
  // console.log(req.body.ID_LIST);
  ID_LIST = req.body.ID_LIST;
  console.log("ID_LIST is changed?", ID_LIST);
  var isFin = 1;
  await run().then(results => {
    console.log("run is finish => then", results);
    while (true) {
      if (isFin > 0) {
        console.log("run is finish => then", results);
        res.send(results);
        break;
      }
    }
  });
  // res.send(b); // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
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

app.post("/proRegister", (req, res) => {
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
const puppeteer = require("puppeteer");
process.setMaxListeners(25);
const cheerio = require("cheerio");
const WaitNotify = require('wait-notify');
const { url } = require("inspector");
const waitNotify = new WaitNotify();

let testUrl = 'https://www.acmicpc.net/status?problem_id=1000&user_id=q9922000&language_id=-1&result_id=4&from_problem=1';
let urls = ['https://www.acmicpc.net/status?problem_id=', '&user_id=', '&language_id=-1&result_id=4'];
let pId = 2438, uId = 'q9922000';
let count = Number(0);
let results = [];
// let ID_LIST = [
//     "수정 실패!","neck392", "kshyun419", "asas6614", "djwls0843", "kwj9294",
//     "rladnr128", "skhu1024", "haeunkim0807", "jwnamid", "hpsd417",
//     "parkjh6275", "ssb1870", "ssj2012sms", "lsy1210", "skl0519",
//     "qmffmzpdl", "idotu", "yebinac", "dlak0011"
// ];
var ID_LIST = [
  "kshyun419", "asas6614", "kwj9294", "skhu1024", "rladnr128",
  "yebinac", "idotu", "neck392", "qmffmzpdl", "skl0519"
];
let ID_LIS_REQ = [];
let i = 0;
async function run() {
  await console.log('run');
  for (; i < ID_LIST.length; i++) {
    await next().then(rurl => {
      console.log("for in",i);
      puppeteer.launch({ headless: true }).then(async browser => {

        console.log("launch in",i);
        const page = await browser.newPage();

        await page.goto(rurl, { waitUntil: "networkidle2" });

        const html = await page.$eval("td.result", e => e.outerHTML);

        await console.log(rurl, '\n', rurl.split('&user_id=')[1].split('&language_id')[0], html, pId);
        await console.log("\n");

        await results.push(rurl.split('&user_id=')[1].split('&language_id')[0], html.includes('맞았습니다!!'));
        await count++;
        isFinish();

        const data = cheerio.load(html);

      }).catch(error => {
        console.log('error', i);
        results.push(rurl.split('&user_id=')[1].split('&language_id')[0], false);
        count++;
        isFinish();
      });
    })

  };
  return results;
};
async function isFinish() {
  await console.log('isFinish');
  if (count >= ID_LIST.length) {
    await console.log(results);
    console.log("isFin is 1");
    isFin = 1;
    // await process.exit(0);
  }
};
async function next() {
  await console.log('next', i);
  let rurl = urls[0] + pId + urls[1] + ID_LIST[i] + urls[2];
  return rurl;
};

// run();