var express = require('express')
var app = express()
var bodyParser = require('body-parser')

const AWSHOST="..."

var mysql = require('mysql')

var connection = mysql.createConnection({
  host : AWSHOST,
  port : 21006,
  user : "Project",
  password : "testing00",
  database : "SWP"
})

console.log("ing");
app.get("/test", function (req, res) {
    connection.query('select * from Solvedrank;', function (err, rows) {
        if (err) {
          console.log("err :"+err)
        }
        console.log('Open DataBase');
        res.json(rows);
    });
});

app.post('/post', (req, res) => {
    console.log('who get in here post /users');
    connection.query('select * from Solvedrank;', function (err, rows) {
        if (err) {
          console.log("err :"+err)
        }

        console.log('Open DataBase');
        res.json(rows);
    });
});

app.listen(8888, () => {
    console.log('Example app listening on port 8888!');
});