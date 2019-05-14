var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'ui0tj7jn8pyv9lp6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user            : 'r2eqnhjr3uqvbeuj',
  password        : 'rjjrehyjvgpv5eo4',
  database        : 'wbwne5wnn9uczgyr'
});
module.exports.pool = pool;
