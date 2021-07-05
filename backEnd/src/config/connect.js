// get the client
const mysql = require('mysql2');
const config = require('./env');
// create the connection to database
const connection = mysql.createConnection({
    host: config.hostName,
    user: config.dbUser,
    password: config.dbPass,
    database: config.dbName
});

module.exports = connection;