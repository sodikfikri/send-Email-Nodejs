var mysql = require('mysql');

var con = mysql.createConnection({
  host: "117.53.46.186",
  user: "development",
  password: "MAN[7Dpzn[",
  database: "service_users"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;