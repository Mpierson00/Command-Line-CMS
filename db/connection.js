//load environment variables
require('dotenv').config();
const mysql = require('mysql2');

const connectionInfo = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true, // wait for connections when none available
    connectionLimit: 10, //maximum number of connections
    queueLimit: 0  //unlimited queueing
});

//export the connection to be used other places
module.exports = connectionInfo.promise();