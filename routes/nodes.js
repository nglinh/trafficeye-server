var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var config = require('../env.json')[process.env.NODE_ENV || 'development'];

var insertPlate = function(db, plate, device_id, detection_time) {
  db.collection('devices').findOne({
    "device_id": device_id,
  }).then(function(device) {
    db.collection('plates').insertOne({
      "plate_id": plate,
      "detection_time": detection_time,
      "device": device,
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
    insertPlate(db, req.body.plate_id, req.params.id, req.body.detection_time);
  });
});

module.exports = router;
