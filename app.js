
var express = require('express');
var app = express();
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://remote_admin:1@localhost:5432/postgres");

app.use('/', express.static(__dirname + '/public'));

app.get('/api/', function (req, res) {
  db.one("SELECT $1 AS value", 123)
    .then(function (data) {
      console.log("DATA:", data.value);
      res.send(`{data: ${data.value}}`);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
      res.send(`{data: ${error}}`);
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});