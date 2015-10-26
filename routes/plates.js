var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var config = require('../env.json')[process.env.NODE_ENV || 'development'];

var findPlate = function(db, plate_id, callback) {
  var result = db.collection('plates').find({"plate_id": plate_id}).toArray();
  return result;
}
/* GET plate. */
router.get('/', function(req, res, next) {
  MongoClient.connect(config.MONGO_URI, function(err, db) {
    assert.equal(null, err);
    var places = findPlate(db, req.query.plate, function (){
      db.close();
    });
    places.then(function(places) {
      res.render('index', { places: places, zoom: 13 });
    });
  });  
});

module.exports = router;
