const express = require("express"); 
const app = express();
const port = 3306; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : "user1",
    password : "skhuA+4.5",
    database : "sample1"
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send('혁이는 코딩 중!')
})


// 리액트에서 노드로 값 받아오기
// app.post("/idplz", (req,res)=>{
//     const serverid = req.body.plzid;
//     console.log(serverid);
// });

// 노드에서 리액트로 값 보내주기
// app.post("/idplz", (req,res)=>{
//     const serverid = req.body.plzid;
//     console.log(serverid);
//     const sendText = {
//         text : "입력 완료",
//     }
//     res.send(sendText);
// });
// 데이터베이스에 값 넣기
app.post("/idplz",(req,res)=>{
    const test = req.body.test;
    connection.query("insert into test(test_body) value (?)",[test],
    function(err, rows, fields){
        if(err){
            console.log("실패");
            // console.log(err)
        }else{
            console.log("성공");
            // console.log(rows);
        };
    });
});
// 데이터베이스에서 값 가져오기
app.post("/callbody",(req,res)=>{
    connection.query("select * from test",
    function(err,rows,fields){
        if(err){
            console.log("불러오기 실패");
        }else{
            console.log("불러오기 성공");
            res.send(rows[rows.length-1]);
        };
    });
});

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
})