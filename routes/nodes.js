var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var config = require('../env.json')[process.env.NODE_ENV || 'development'];

var insertPlate = function(db, plate, device_id) {
  db.collection('devices').findOne().then(function(device) {
    db.collection('plates').insertOne({
      "plate_id": plate,
      "device": device
    }, function(err, result) {
      assert.equal(err, null);
      console.log("Inserted a document into the plates collection.");
      db.close();
    });  
  });
};

/* POST plate detected */
router.post('/:id', function(req, res, next) {
  MongoClient.connect(config.MONGO_URI, function(err, db) {
    assert.equal(null, err);
    insertPlate(db, req.body.plate_id, req.params.id);
  });
});

module.exports = router;
