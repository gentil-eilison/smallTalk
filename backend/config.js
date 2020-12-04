const mysqlConnection = require('mysql')

const mysql = mysqlConnection.createConnection({
    host: "localhost",
    user: "root",
    database: "smalltalk",
    password: "7531596248"
})

module.exports = mysql 