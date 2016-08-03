var app = require('express')();
var http = require('http').Server(app);
var api = require('./api.js');

app.get('/materials', api.getMaterials);
app.get('/submaterials', api.getSubmaterials);

http.listen(3000, function() {
  console.log('listening on *:3000');
});
