var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Sighting = new Schema({
    sighted_at : String,
    reported_at : String,
    location : String,
    shape : String,
    duration : String,
    description : String
});

module.exports = mongoose.model('Sighting', Sighting);