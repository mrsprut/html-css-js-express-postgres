
var express = require('express');
var app = express();
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://remote_admin:1@localhost:5432/postgres");

app.use('/', express.static(__dirname + '/public'));
app.use('/api', express.json());

app.get('/api/product', function (req, res) {
  db.query("SELECT * FROM product")
    .then(function (data) {
      // console.log("DATA:", JSON.stringify(data));
      console.log("DATA:", JSON.stringify(data));
      res.send(`{data: ${JSON.stringify(data)}}`);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
      res.send(`{data: ${error}}`);
    });
});

app.post('/api/product', function (req, res) {
  const newProduct = req.body;
  console.log(`{data: ${JSON.stringify(newProduct)}}`);
  db.none(`INSERT INTO product (title, description, price, quantity) VALUES ('${newProduct.title}', '${newProduct.description}', '${newProduct.price}', '${newProduct.quantity}')`)
    .then(function (data) {
      res.status(201).json({'message': 'a new product was created'});
    })
    .catch(function (error) {
      console.log("ERROR:", error);
      res.status(500).json({'error': error});
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});