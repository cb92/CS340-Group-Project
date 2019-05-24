var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.JAWS_HOST_VAL,
  user            : process.env.JAWS_USER_process.env.,
  password        : process.env.JAWS_PW_process.env.,
  database        : process.env.JAWS_DB_process.env.
});
module.exports.pool = pool;
