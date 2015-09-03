var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/json', function (req, res) {

  var db = req.db;
  var sql = 'SELECT * FROM fruits LIMIT ?';

  db.raw(sql, [2])
      .then(function (rows) {
        console.log(rows);
        res.send({success: true, rows: rows[0]});
      })
      .catch(function (err) {
        console.log(err);
      });

});

router.get('/sql', function (req, res) {
  var db = req.db;

  var sql = db('fruits')
      .select()
      .limit(10)
      .orderBy('name', 'desc')
      .toSQL();

  console.log(sql);
});


router.get('/fruits', function (req, res) {

  var fruits = {};

  fruits.labels = ['ม.ค', 'ก.พ', 'มี.ค'];
  fruits.series = ['รับมา', 'รายไป'];

  fruits.data = [
    [65, 59, 80],
    [28, 48, 40]
  ];

  res.send({ok: true, data: fruits});


});


module.exports = router;
