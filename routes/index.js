var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { lat: 1.3, lon: 103.8, zoom: 12 });
});

module.exports = router;
