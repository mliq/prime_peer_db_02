var express = require('express');
var router = express.Router();
var assignments = require('../models/assignment');
var moment = require('moment');
var name;
var startDate;
var endDate;

//    moment().year(1000);
//var endDate = moment().year(2016);
//console.log(moment().year(1));
//console.log(moment().year(1000));

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

    //if (req.query.name != undefined) {
    //    name = req.query.name;
    //}
    //
    console.log(req.query);

    //if (req.query.startDate != '' || req.query.startDate != undefined) {
    //    startDate = req.query.startDate;
    //}
    //
    //if (req.query.endDate != '' || req.query.endDate != undefined) {
    //    endDate = req.query.endDate;
    //}

    //console.log('name:' + name + "| dates:" + startDate + " " + endDate + "direction: "+ direction);

    startDate = req.query.startDate;
    endDate = req.query.endDate;
    name = req.query.name;

    assignments.find({
            name: new RegExp(name, 'i'),
            date_completed: {
                $gte: startDate,
                $lte: endDate
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
