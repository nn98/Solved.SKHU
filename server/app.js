const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const createError = require('http-errors');
const https = require('https');
const logger = require('morgan');
const mysql = require('mysql2');
const path = require('path');

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
httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS Server running on port  ${httpsPort}`);
});

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
  req.mysql = connection;
  next();
};

process.setMaxListeners(50);

const algorithmRouter = require('./routes/algorithm');
const assignmentsRouter = require('./routes/assignments');
const qnaRouter = require('./routes/qna');
const randomProblemRouter = require('./routes/randomProblem');
const rankingRouter = require('./routes/ranking');
const ratingRouter = require('./routes/rating');
const registerRouter = require('./routes/register');
const usersRouter = require('./routes/users');

app.use(mysqlMiddleware);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/algorithm', algorithmRouter);
app.use('/assignments', assignmentsRouter);
app.use('/qna', qnaRouter);
app.use('/randomProblem', randomProblemRouter);
app.use('/ranking', rankingRouter);
app.use('/rating', ratingRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);

app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`express is  ${port}`);
});

app.get('/', (req, res) => {
  res.send('working?');
});
app.get('/httpstest', (req, res) => {
  res.send('https is working?');
});

app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
