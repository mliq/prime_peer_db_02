var express = require('express');
var router = express.Router();
var assignments = require('../models/assignment');

/* GET /assignments listing. */
router.get('/', function(req, res, next) {
  assignments.find(function (err, assignments) {
    if (err) return next(err);
    res.json(assignments);
  });
});

/* POST /assignments */
router.post('/', function(req, res, next) {
  assignments.create(req.body, function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

///* GET /assignments/id */
//router.get('/:id', function(req, res, next) {
//  assignments.findById(req.params.id, function (err, assignment) {
//    if (err) return next(err);
//    res.json(assignment);
//  });
//});

router.get('/sort', function (req, res, next) {
    console.log(req.query);
    assignments.find({}, null,
        {
            sort: {
                name: req.query.direction
            }
        }
        , function (err, data) {

            if (err) {
                console.log(err);
                return next(err);
            }
            res.json(data);
        });
});

/* PUT /assignments/:id */
router.put('/:id', function(req, res, next) {
  assignments.findByIdAndUpdate(req.params.id, req.body, function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

/* DELETE /assignments/:id */
router.delete('/:id', function(req, res, next) {
  assignments.findByIdAndRemove(req.params.id, req.body, function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

console.log('assignments route loaded');
module.exports = router;
