var express = require('express')
var app = express()
var mysql = require('mysql')

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    port     : 3306,
    user     : 'user1',
    password : 'skhuA+4.5',
    database : 'sample1'
  });

  connection.connect();

//   var query = `select * from user`;
  
app.get("/test", function (req, res) {
    connection.query('select * from user', function (error, rows,fields) {
        if(!error){
            console.log(rows);
            console.log(JSON.parse(JSON.stringify(rows))) // 이렇게 해야 제대로 object 방식으로 사용 가능
            res.json(rows);
          }else{
            console.log('Error while performing Query.', error);
          }
    });
});
  

  /* 쿼리 결과 값을 받아올 경우 */
//   connection.query(quer, function(error, rows, fields) {
//     if(!error){
//       console.log(rows);
//       console.log(JSON.parse(JSON.stringify(rows))) // 이렇게 해야 제대로 object 방식으로 사용 가능
//     }else{
//       console.log('Error while performing Query.', error);
//     }
//   });
     

app.post('/post', (req, res) => {
    console.log('who get in here post /user');
    connection.query('select * from user ', function (err, rows) {
        if (err) {
        console.log("err :"+err)
        }

        console.log('Open DataBase');
        res.json(rows);
    });
});
  /* 쿼리 결과 값이 필요 없는 경우 */
  
  
app.listen(8088, function(){
    console.log("start server 8088!!")
});

//   connection.end();