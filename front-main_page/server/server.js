const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const WaitNotify = require('wait-notify')
const waitNotify = new WaitNotify()
const waitNotify2 = new WaitNotify()
let AssignTaskExecute = false

// cors 사용하여 정보 받는 것 우회하기
app.use(cors())

// JSON과 URL-encoded 외에도 해석할 수 있도록 해주기
app.use(bodyParser.json())

// app.get('/', (req, res) => res.send('Hello World2!'))

app.listen(port, () => {
  console.log(`express is  ${port}`)
})

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '15.165.159.248',
  user: 'Project',
  password: 'testing00',
  database: 'SWP',
})
// var connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'gusqhr12@',
//   database: 'prisma',
// })

connection.connect(() => {
  console.log('connecting')
})

// QnA api @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
app.post('/QnAUser', (req, res) => {
  const sql = 'INSERT INTO Qnauser SET ?'
  connection.query(sql, req.body, function (err, result, fields) {
    if (err) {
      res.send({ error: err.errno })
    } else {
      console.log(result)
      res.send({ data: '어서오세요' })
    }
  })
})

// Qna 값 출력
app.get('/QnA', (req, res) => {
  const sql = 'SELECT * FROM Qna'
  connection.query(sql, function (err, result, fields) {
    if (err) throw err
    console.log('QnA 출력')
    res.send(result)
  })
})

// QnaInner 값 출력
app.get('/QnAInner', (req, res) => {
  const sql = 'SELECT * FROM Qnainner'
  connection.query(sql, function (err, result, fields) {
    if (err) throw err
    console.log('QnA안에꺼 출력')
    res.send(result)
  })
})

//Qna 추가
app.post('/QnAAdd', (req, res) => {
  const userBody = [req.body.userId, req.body.password]
  const userSql =
    'SELECT * FROM Qnauser WHERE Qnauser.name = ? and Qnauser.password = ?;'
  connection.query(userSql, userBody, function (err, result, fields) {
    if (err) throw err
    if (result.length === 0) {
      res.send({ error: '사용자가 올바르지 않습니다.' })
    } else {
      const insertBody = [
        req.body.content,
        req.body.userIP,
        req.body.userId,
        req.body.problem,
      ]
      const insertSql =
        'INSERT INTO Qna(content, userip, USER_ID, problem) value (?,?,?,?);'
      connection.query(insertSql, insertBody, function (err, result, fields) {
        if (err) throw err
        console.log('QnA 더하기')
        // console.log(result)
        res.redirect('/QnA')
      })
    }
  })
})

// QnaInner 추가
app.post('/QnAInnerAdd', (req, res) => {
  const userBody = [req.body.userId, req.body.password]
  const userSql =
    'SELECT * FROM Qnauser WHERE Qnauser.name = ? and Qnauser.password = ?;'
  connection.query(userSql, userBody, function (err, result, fields) {
    if (err) throw err
    if (result.length === 0) {
      res.send({ error: '사용자가 올바르지 않습니다.' })
    } else {
      const insertBody = [
        req.body.content,
        req.body.userIP,
        req.body.userId,
        req.body.qnaId,
      ]
      const insertSql =
        'INSERT INTO Qnainner(content, userip, USER_ID, QNA_ID) value (?,?,?,?);'
      connection.query(insertSql, insertBody, function (err, result, fields) {
        if (err) throw err
        console.log('QnA안에꺼 더하기')
        // console.log(result)
        res.redirect('/QnAInner')
      })
    }
  })
})

// Qna 삭제
app.post('/QnADelete', (req, res) => {
  const userBody = [req.body.userId, req.body.password]
  const userSql =
    'SELECT * FROM Qnauser WHERE Qnauser.name = ? and Qnauser.password = ?;'
  connection.query(userSql, userBody, function (err, result, fields) {
    if (err) throw err
    if (result.length === 0) {
      res.send({ error: '사용자가 올바르지 않습니다.' })
    } else {
      const deleteBody = [req.body.ID, req.body.userId]
      const deleteSql = 'DELETE FROM Qna WHERE Qna.ID = ? and Qna.USER_ID = ?;'
      connection.query(deleteSql, deleteBody, function (err, result, fields) {
        if (result.affectedRows === 0) {
          res.send({ error: '사용자가 올바르지 않습니다.' })
        } else {
          console.log('QnA 삭제')
          res.redirect('/QnA')
        }
      })
    }
  })
})

// QnaInner 삭제
app.post('/QnAInnerDelete', (req, res) => {
  const userBody = [req.body.userId, req.body.password]
  const userSql =
    'SELECT * FROM Qnauser WHERE Qnauser.name = ? and Qnauser.password = ?;'
  connection.query(userSql, userBody, function (err, result, fields) {
    if (err) throw err
    if (result.length === 0) {
      res.send({ error: '사용자가 올바르지 않습니다.' })
    } else {
      const deleteBody = [req.body.ID, req.body.userId]
      const deleteSql =
        'DELETE FROM Qnainner WHERE Qnainner.ID = ? and Qnainner.USER_ID = ?;'
      connection.query(deleteSql, deleteBody, function (err, result, fields) {
        if (result.affectedRows === 0) {
          res.send({ error: '사용자가 올바르지 않습니다.' })
        } else {
          console.log('QnA안에꺼 삭제')
          res.redirect('/QnAInner')
        }
      })
    }
  })
})

//
//
//
//
//
//
// 기타 api @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.get('/get', (req, res) => {
  const sql = 'select * from Problem LIMIT 0,10'

  connection.query(sql, function (err, result, fields) {
    if (err) throw err
    console.log(result)
    res.send(result)
  })
})

// rank.js가 서버에게 요청한 데이터를 받을 코드
// "/ranking" 서브스트링을 사용하는 방식이 하나밖에 없기 때문에 rank.js는 get방식을 생략할 수 있음

app.get('/ranking', (req, res) => {
  const sql = 'select * from User order by skhurank' // 요청한 값을 받기 위해 mysql에서 사용할 sql문을 같이 보냄
  connection.query(sql, function (err, result, fields) {
    // if문은 에러 출력을 위한 코드
    if (err) throw err
    // result는 가져온 결과값
    // console.log(result)
    // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음
    res.send(result)
  })
})

// req는 소스코드로부터 받은 서버로 보낼 JSON 파일이 담긴 요청, res는 서버가 보낸 응답정보를 저장한 객체이고 우리는 JSON 파일 형식을 사용할 것임

app.post('/assignments', async (req, res) => {
  console.log('Assignments/post ', 'is called')
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  const b = req.body
  console.log(req.body)

  console.log('Default\tID_LIST', ID_LIST)
  console.log('Req\tID_LIST', req.body.ID_LIST)
  console.log('Problem ID\t', req.body.pID)
  ID_LIST = req.body.ID_LIST
  pID = req.body.pID
  // Assignment.pID=req.body.pID;
  AssignTaskExecute = true
  run()
  if (AssignTaskExecute) await waitNotify2.wait()

  res.send(results)
})
// res.send(b); // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
//res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.

app.post('/userPage', (req, res) => {
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  console.log(req)
  const b = req.body
  res.send(b) // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
  //res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.
})

app.post('/register', (req, res) => {
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  console.log(req)
  const b = req.body
  res.send(b) // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
  //res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.
})

app.post('/proRegister', (req, res) => {
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  console.log(req)
  const b = req.body
  res.send(b) // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
  //res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.
})

app.post('/studentRegister', (req, res) => {
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  console.log(req)
  const b = req.body
  res.send(b) // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
  //res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.
})

app.get('/algorithm', (req, res) => {
  const sql = '' // 요청한 값을 받기 위해 mysql에서 사용할 sql문을 같이 보냄
  connection.query(sql, function (err, result, fields) {
    // if문은 에러 출력을 위한 코드
    if (err) throw err
    // result는 가져온 결과값
    console.log(result)
    // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음
    res.send(result)
  })
})

// connection.end()

/* Assignment Part - 2022-05-19 */
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
process.setMaxListeners(50)

let pID = 1085
let processID
let results = []
let mAsyncTaskExecute = false
let urls = [
  'https://www.acmicpc.net/status?problem_id=',
  '&user_id=',
  '&language_id=-1&result_id=4',
]

/* Test Data => replace by Req */
let ID_LIST = [
  'kshyun419',
  'asas6614',
  'kwj9294',
  'skhu1024',
  'rladnr128',
  // "yebinac", "idotu", "neck392", "qmffmzpdl", "skl0519"
]
/* */

async function run() {
  console.log('1. run')
  console.log('ID_LIST', ID_LIST)
  console.log('pID', pID)
  processID = ID_LIST.shift()
  let url = urls[0] + pID + urls[1] + processID + urls[2]
  execute(url)
}

async function execute(url) {
  console.log('2. execute')
  puppeteer
    .launch({ headless: true })
    .then(async (browser) => {
      if (mAsyncTaskExecute) {
        await waitNotify.wait()
      }

      console.log('now process\t', processID)
      mAsyncTaskExecute = true
      const page = await browser.newPage()

      await page.goto(url, { waitUntil: 'networkidle2' })

      const html = await page.$eval('td.result', (e) => e.outerHTML)

      results.push(processID, html.includes('맞았습니다!!'))
      console.log('\t\t', processID, 'is solve')
      isFinish()
    })
    .catch((error) => {
      console.log('\t\t', processID, "isn't solve")
      results.push(processID, false)
      isFinish()
    })
}

async function isFinish() {
  console.log('3. isFinish')
  waitNotify.notify()
  mAsyncTaskExecute = false
  if (ID_LIST.length == 0) {
    console.log(results)
    AssignTaskExecute = false
    waitNotify2.notify()
    // process.exit(0);
  } else {
    console.log(
      '-------------------------------------------------------------------------'
    )
    run()
  }
}
