var mysql = require('mysql');

module.exports.connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'Puja@123',
    database : 'assignment'
  });