var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.JAWS_HOST_VAL,
  user            : process.env.JAWS_USER_VAL,
  password        : process.env.JAWS_PW_VAL,
  database        : process.env.JAWS_DB_VAL
});
module.exports.pool = pool;
