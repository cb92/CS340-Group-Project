var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : ENV['JAWS_HOST_VAL'],
  user            : ENV['JAWS_USER_VAL'],
  password        : ENV['JAWS_PW_VAL'],
  database        : ENV['JAWS_DB_VAL']
});
module.exports.pool = pool;
