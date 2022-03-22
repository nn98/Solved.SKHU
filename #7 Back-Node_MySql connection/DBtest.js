var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

var connection = mysql.createConnection({
    host : '127.0.0.1',
    port : 3306,
    user : 'user1',
    password : 'skhuA+4.5',
    database : 'sample1'
})

connection.connect();

app.listen(8088,function(){
    console.log("starting server 8088")
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')

app.get('/',function(req,res){
    res.send("hello")
})

app.get('/main',function(req,res){
    res.sendFile(__dirname+"/public/main.html")
})

// 기본 post 요청
// app.post('/email',function(req,res){
//     console.log(req.body.email)
//     res.send("<h1>Welcome "+req.body.email+"</h1>")
// })
// ejs를 활용한 post 요청
app.post('/email', function(req,res){
    console.log(req.body.email);
    res.render('email.ejs', {'email' : req.body.emial});
});

// app.post('/ajax',function(req,res){
//     console.log(req.body.email);
//     var responseData = {'result' : 'ok', 'email' : req.body.email};
//     res.json(responseData);
// });

app.post('/ajax',function(req,res){
    var email = req.body.email;
    var responseData = {};
    var query = connection.query('select id from user where email="' + email + '"',function(err,rows){
        if(err) throw err;
        if(rows[0]){
            // console.log(rows[0].id);
            responseData.result = "ok";
            responseData.id = rows[0].id;
        }else{
            // console.log('none');
            responseData.reuslt = "none";
            responseData.id = "";
        }
        res.json(responseData);
    })
});

