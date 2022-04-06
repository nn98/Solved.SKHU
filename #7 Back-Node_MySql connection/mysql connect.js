var express = require('express')
var app = express()
var bodyParser = require('body-parser')


var mysql = require('mysql')

var connection = mysql.createConnection({
  host : "localhost",
  port : 21006,
  user : "root",
  password : "qq192837qq*",
  database : "SWP"
})
console.log("ing");

app.get("/test", function (req, res) {
    connection.query('show databases;', function (err, rows) {
        if (err) {
          console.log("err :"+err)
        }

        console.log('Open DataBase');
        res.json(rows);
    });
});

app.post('/post', (req, res) => {
    console.log('who get in here post /users');
    connection.query('select pc_status from pc ', function (err, rows) {
        if (err) {
          console.log("err :"+err)
        }

        console.log('Open DataBase');
        res.json(rows);
    });
});

app.listen(8880, () => {
    console.log('Example app listening on port 8880!');
});
