var Sighting = require('../models/sightings'),
    ent = require("ent"),
    page = 0;


exports.list = function(req, res){
    var today = new Date();

    Sighting.count(null, function(err, count){
        if (err) {
            res.send(500, err);
        }

        var limit = req.query.limit;
        var offset = req.query.offset;

        Sighting.find()
            .skip(offset).limit(limit)
            .sort({ sighted_at : 'desc' })
            .exec(function(err, sightings){
                if(err){
                    res.send(500, err);
                }
                var retVal = {"sightings" : [], "meta": { "total": count }};
                for(var i= 0, l=sightings.length; i<l; i++){
                    retVal.sightings.push({
                        id : sightings[i]._id,
                        description : ent.decode(sightings[i].description),
                        sighted_at : sightings[i].sighted_at,
                        reported_at : sightings[i].reported_at
                    });
                }
                res.json(retVal);
            });
    });
};