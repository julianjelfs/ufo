var request = require("request"),
    fs = require("fs"),
    byline = require("byline"),
    mongoose = require("mongoose"),
    Sighting = require('./models/sighting');

mongoose.connect(process.env.MONGODB_UFO_URI);

var id = 0;
var stream = fs.createReadStream('./ufo_awesome.json');
stream = byline.createStream(stream);

stream.on('data', function(line) {
    id += 1;

    console.log("Processing ID " + id);
    var sighting = JSON.parse(line);
    var s = new Sighting(sighting);
    s.save(function (err, s) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log("Sighting pushed to mongo");

    });
});