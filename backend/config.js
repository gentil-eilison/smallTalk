const mysqlConnection = require('mysql')

const mysql = mysqlConnection.createConnection({
    host: "localhost",
    user: "root",
    database: "smalltalk",
    password: ""
})

module.exports = mysql 