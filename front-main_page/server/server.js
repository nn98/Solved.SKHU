const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

// cors 사용하여 정보 받는 것 우회하기
app.use(cors())

app.use(bodyParser.json())

// app.get('/', (req, res) => res.send('Hello World2!'))

app.listen(port, () => {
  console.log(`express is  ${port}`)
})

var mysql = require('mysql')
// var connection = mysql.createConnection({
//   host: '54.180.106.114',
//   user: 'Project',
//   password: 'testing00',
//   database: 'SWP',
// })
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'gusqhr12@',
  database: 'prisma',
})

connection.connect(() => {
  console.log('connecting')
})

app.get('/get', (req, res) => {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  const sql = 'SELECT * FROM commentusers'
  connection.query(sql, function (err, result, fields) {
    if (err) throw err
    console.log(result)
    // res.send(result)
  })
})

app.get('/ranking', (req, res) => {
  const sql = 'select * from Ranking order by skhurank'
  connection.query(sql, function (err, result, fields) {
    if (err) throw err
    console.log(result)
    res.send(result)
  })
})

app.post('/QnAUser', (req, res) => {
  const sql = 'INSERT INTO qnauser SET ?'
  // const sql = 'SELECT * FROM qnauser'
  connection.query(sql, req.body, function (err, result, fields) {
    if (err) res.status(500).send({ error: err.toString() })
    else {
      console.log(result)
      res.send(result)
    }
  })
})

// app.post('/post', (req, res) => {
//   const sql = 'INSERT INTO users SET ?'
//   con.query(sql, req.body, function (err, req, res) {
//     console.log(req)
//     res.send('등록 완료')
//   })
// })

// connection.end()
