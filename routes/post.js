var express = require('express');
var router = express.Router();
var db = require('../model/dbConfig');
var path = require('path');

router.get('/home', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../views/index.html'))
});

router.get('/', function (req, res, next) {
  var page = parseInt(req.query.page);
  var start = (page - 1) * 10;
  db
    .find()
    .skip(start)
    .limit(10)
    .exec()
    .then(data => {
      res.json(data)
    })
    .catch(err => console.log(err))
});


router.get('/count', function (req, res, next) {
  db
    .find()
    .estimatedDocumentCount()
    .exec()
    .then(result => {
      res.json(result)
    })
    .catch(err => console.log(err))
});


module.exports = router;
