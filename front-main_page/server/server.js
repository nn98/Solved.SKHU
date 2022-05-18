const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

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
  host: '13.124.13.173',
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
  const sql = 'INSERT INTO qnauser SET ?'
  connection.query(sql, req.body, function (err, result, fields) {
    if (err) {
      res.send({ error: err.errno })
    } else {
      console.log(result)
      res.send({ data: '어서오세요' })
    }
  })
})

app.get('/QnA', (req, res) => {
  const sql = 'SELECT * FROM qna'
  connection.query(sql, function (err, result, fields) {
    if (err) throw err
    console.log('QnA 출력')
    res.send(result)
  })
})

app.get('/QnAInner', (req, res) => {
  const sql = 'SELECT * FROM qnainner'
  connection.query(sql, function (err, result, fields) {
    if (err) throw err
    console.log('QnA안에꺼 출력')
    res.send(result)
  })
})

app.post('/QnAAdd', (req, res) => {
  const insertBody = [
    req.body.content,
    req.body.userIP,
    req.body.userId,
    req.body.problem,
  ]
  const userBody = [req.body.userId, req.body.password]
  const userSql =
    'SELECT * FROM qnauser WHERE qnauser.name = ? and qnauser.password = ?;'
  connection.query(userSql, userBody, function (err, result, fields) {
    if (err) throw err
    if (result.length === 0) {
      res.send({ error: '사용자가 올바르지 않습니다.' })
    } else {
      const insertSql =
        'INSERT INTO qna(content, userIP, userId, problem) value (?,?,?,?);'
      connection.query(insertSql, insertBody, function (err, result, fields) {
        if (err) throw err
        console.log('QnA 더하기')
        // console.log(result)
        res.redirect('/QnA')
      })
    }
  })
})

app.post('/QnAInnerAdd', (req, res) => {
  const insertBody = [
    req.body.content,
    req.body.userIP,
    req.body.userId,
    req.body.qnaId,
  ]
  const userBody = [req.body.userId, req.body.password]
  const userSql =
    'SELECT * FROM qnauser WHERE qnauser.name = ? and qnauser.password = ?;'
  connection.query(userSql, userBody, function (err, result, fields) {
    if (err) throw err
    if (result.length === 0) {
      res.send({ error: '사용자가 올바르지 않습니다.' })
    } else {
      const insertSql =
        'INSERT INTO qnainner(content, userIP, userId, qnaId) value (?,?,?,?);'
      connection.query(insertSql, insertBody, function (err, result, fields) {
        if (err) throw err
        console.log('QnA안에꺼 더하기')
        // console.log(result)
        res.redirect('/QnAInner')
      })
    }
  })
})

app.post('/QnADelete', (req, res) => {
  const userBody = [req.body.userId, req.body.password]
  const userSql =
    'SELECT * FROM qnauser WHERE qnauser.name = ? and qnauser.password = ?;'
  connection.query(userSql, userBody, function (err, result, fields) {
    if (err) throw err
    if (result.length === 0) {
      res.send({ error: '사용자가 올바르지 않습니다.' })
    } else {
      const deleteBody = [req.body.ID, req.body.userId]
      const deleteSql = 'DELETE FROM qna WHERE qna.ID = ? and qna.userId = ?;'
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

app.post('/QnAInnerDelete', (req, res) => {
  const userBody = [req.body.userId, req.body.password]
  const userSql =
    'SELECT * FROM qnauser WHERE qnauser.name = ? and qnauser.password = ?;'
  connection.query(userSql, userBody, function (err, result, fields) {
    if (err) throw err
    if (result.length === 0) {
      res.send({ error: '사용자가 올바르지 않습니다.' })
    } else {
      const deleteBody = [req.body.ID, req.body.userId]
      const deleteSql =
        'DELETE FROM qnainner WHERE qnainner.ID = ? and qnainner.userId = ?;'
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
    console.log(result)
    // res.send를 해야, 소스코드 fetch에서 res로 사용할 수 있음
    res.send(result)
  })
})

// req는 소스코드로부터 받은 서버로 보낼 JSON 파일이 담긴 요청, res는 서버가 보낸 응답정보를 저장한 객체이고 우리는 JSON 파일 형식을 사용할 것임
app.post('/assignments', (req, res) => {
  // fetch에서 보낸 requsetOption객체의 body값을 찾아낸다.
  const b = req.body
  res.send(b) // res.send()를 해야, 소스코드 fetch에서 res로 사용할 수 있음
  //res.redirect(경로)는 이 server.js에서 경로를 찾아 다시 서버에 호출한다는 뜻이다.
})

app.post('/userPage', (req, res) => {
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
