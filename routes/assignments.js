var express = require('express');
var router = express.Router();
var assignments = require('../models/assignment');
var moment = require('moment');
var name = "";

/* GET /assignments listing. */
router.get('/', function (req, res, next) {
    assignments.find(function (err, assignments) {
        if (err) return next(err);
        res.json(assignments);
    });
});

/* POST /assignments */
router.post('/', function (req, res, next) {
    var assignment = new assignments(req.body);
    assignment.normalized = assignment.name.toLowerCase();
    assignments.create(assignment, function (err, assignment) {
        if (err) return next(err);
        res.json(assignment);
    });
});

/* GET /assignments/id */
router.get('/sort', function (req, res, next) {

    if (req.query.name != undefined) {
        name = req.query.name;
    }

    var today = moment().startOf('day'); // midnight today.
    var tomorrow = moment(today).add(1, 'days'); // good.
    var yesterday = moment(today).subtract(1, 'days');

    assignments.find({
            name: new RegExp(name, 'i'),
            date_completed: {
                $gte: yesterday,
                $lte: tomorrow
            }
        }, null,
        {
            sort: {
                normalized: req.query.direction
            }

        }, function (err, data) {

            if (err) {
                console.log(err);
                return next(err);
            }
            res.json(data);
        });
});

/* PUT /assignments/:id */
router.put('/:id', function (req, res, next) {
    console.log(req.body);
    assignments.findByIdAndUpdate(req.params.id, req.body, function (err, assignment) {
        if (err) return next(err);
        res.json(assignment);
    });
});

/* DELETE /assignments/:id */
router.delete('/:id', function (req, res, next) {
    assignments.findByIdAndRemove(req.params.id, req.body, function (err, assignment) {
        if (err) return next(err);
        res.json(assignment);
    });
});

console.log('assignments route loaded');
module.exports = router;
