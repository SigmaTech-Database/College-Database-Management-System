var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database : 'user',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect();




module.exports = connection;
