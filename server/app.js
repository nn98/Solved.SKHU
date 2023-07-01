// Packages
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
// const http = require('http');
const createError = require('http-errors');
const https = require('https');
const logger = require('morgan');
const mysql = require('mysql2');
const path = require('path');
const puppeteer = require('puppeteer');

// const Vals
const app = express();
const port = process.env.PORT || 3001;
const httpsPort = 3002;
const privateKey = fs.readFileSync(
    'keys/privkey8.pem',
    'utf8'
);
const certificate = fs.readFileSync('keys/cert8.pem', 'utf8');
const ca = fs.readFileSync('keys/chain8.pem', 'utf8');
const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};
const httpsServer = https.createServer(credentials, app);
const WaitNotify = require('wait-notify');
const connection = mysql.createPool({
  host: 'sol-skhu.duckdns.org',
  user: 'Project',
  password: 'testing00',
  database: 'swp',
  multipleStatements: true,
  charset: 'utf8mb4',
  connectionLimit: 30,
});
connection.getConnection((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});
const mysqlMiddleware = (req, res, next) => {
  // req 객체에 MySQL connection 객체를 할당
  req.mysql = connection;
  next();
};

httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS Server running on port  ${httpsPort}`);
});

/*
const httpServer = http.createServer(app);
httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});
*/

process.setMaxListeners(50);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const rankingRouter = require('./routes/ranking');
const assignmentsRouter = require('./routes/assignments');
const qnaRouter = require('./routes/qna');

assignmentsRouter.setConnection(connection);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 미들웨어를 Express 앱에 연결
app.use(mysqlMiddleware);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ranking', rankingRouter);
app.use('/assignments', assignmentsRouter.router);
app.use('/qna', qnaRouter);

app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`express is  ${port}`);
});

// System check
app.get('/', (req, res) => {
  res.send('working?');
});
app.get('/httpstest', (req, res) => {
  res.send('https is working?');
});

/* +++++ Random +++++ */
app.post('/randomProblem', (req, res) => {
  console.log('randomProblem/get', '- called');
  let sql = 'select * from problem where solved_rank between 1 and 17 order by rand() limit 1;';
  console.log('get randomProblem', sql);
  connection.query(sql, function (err, result, fields) {
    if (err) {
      console.log('error in RandomProblem/get', err);
      throw err;
    }
    console.log('randomProblem/get', '- callback');
    res.json(result);
  });
});

/* +++++ UserCheck +++++ */
app.post('/userCheck', (req, res) => {
  console.log('userCheck/get', '- called');
  let sql = 'select ID from user;';
  connection.query(sql, function (err, result, fields) {
    if (err) {
      console.log('error in RandomProblem/get', err);
      throw err;
    }
    console.log('userCheck/get', '- callback');
    res.json(result);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
