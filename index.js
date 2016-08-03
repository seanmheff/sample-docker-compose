var app = require('express')();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : 'bspec',
  password : process.env.DB_PASSWORD,
  database : 'bspec'
});

var http = require('http').Server(app);

connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected...");  
  } else {
    console.log("Error connecting database... ", err);  
  }
});

app.get('/', function(req, res) {
  connection.query('SELECT * from products LIMIT 2', function(err, rows, fields) {
    connection.end();
    if (!err) { res.json(rows); }
    else { res.json(err); }
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
