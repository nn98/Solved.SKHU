const mysql = require('mysql2');

require('dotenv').config({ path: '../.env' });
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbCharset = process.env.DB_CHARSET;

const connection = mysql.createPool({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    charset: dbCharset,
    connectionLimit: 30,
    multipleStatements: true,
});

module.exports = connection;
