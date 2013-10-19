var Sighting = require('../models/sightings'),
    ent = require("ent"),
    page = 0;


exports.search = function(req, res) {

    var limit = req.query.limit;
    var search = req.query.s;
    var regex = new RegExp(search, 'i');

    Sighting.textSearch(search, {
        limit : 20
    }, function(err, sightings){
        if(err){
            res.send(500, err);
        }
        res.json({"sightings" : sightings});
    });
}

exports.list = function(req, res){
    var today = new Date();

    Sighting.count(null, function(err, count){
        if (err) {
            res.send(500, err);
        }

        var limit = req.query.limit;
        var offset = req.query.offset;
        var search = req.query.s;
        var regex = new RegExp(search, 'i');

        Sighting.find({description : regex })
            .skip(offset).limit(limit)
            .sort({ sighted_at : 'desc' })
            .exec(function(err, sightings){
                if(err){
                    res.send(500, err);
                }
                res.json({"sightings" : sightings, "total": count });
            });
    });
};