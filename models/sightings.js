var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    textSearch = require('mongoose-text-search');

var Sighting = new Schema({
    sighted_at : String,
    reported_at : String,
    location : String,
    shape : String,
    duration : String,
    description : String
});

Sighting.plugin(textSearch);
Sighting.index({
    description : "text"
});

module.exports = mongoose.model('Sighting', Sighting);