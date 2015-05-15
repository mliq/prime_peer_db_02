var mongoose = require('mongoose');

var assignmentSchema = new mongoose.Schema({
    name: String,
    normalized: String,
    score: Number,
    date_completed: Date
});

console.log('assignment model loaded')
module.exports = mongoose.model('assignment', assignmentSchema);