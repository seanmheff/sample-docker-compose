var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : 'bspec',
  password : process.env.DB_PASSWORD,
  database : 'bspec'
});

connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected...");
  } else {
    console.log("Error connecting database... ", err);
  }
});

module.exports = {

  getMaterials: function(req, res) {
    var material = connection.escape(req.query.material).toLowerCase();
    connection.query(
    `
      SELECT Name, image
      FROM products
      WHERE Section like ${material}
    `,
    function(err, rows) {
      if (!err) { res.json({ products: rows }); }
      else { res.json(err); }
    });
  },

  getSubmaterials: function(req, res) {
    var submaterial = connection.escape(req.query.submaterial).toLowerCase();
    connection.query(
    `
      SELECT Name, image, download, supplier, link, productinformation
      FROM subproducts
      WHERE section like ${submaterial}
    `,
    function(err, rows) {
      if (!err) { res.json({ subproducts: rows }); }
      else { res.json(err); }
    });
  }

};
