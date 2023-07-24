const mysql = require('mysq');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'identification',
});

module.exports = connection;
