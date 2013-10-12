App = Ember.Application.create();

//App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function(){
    this.resource("sightings", { path : "/" }, function(){
        this.resource("sighting", {path:":sighting_id"})
    });

});

App.SightingsRoute = Ember.Route.extend({
    model: function () {
        return sightings;
    }
});

App.SightingRoute = Ember.Route.extend({
    model: function(params) {
        return sightings.findBy('id', params.sighting_id);
    }
});

App.Sighting = DS.Model.extend({
    sighted_at : DS.attr('string'),
    reported_at : DS.attr('string'),
    location : DS.attr('string'),
    shape : DS.attr('string'),
    duration : DS.attr('string'),
    description : DS.attr('string')
});

var sightings = [
    {
        id: 1,
        sighted_at: "19961010",
        reported_at: "19961111",
        location:"Utah",
        shape:"oblong",
        duration:"10 minutes",
        description:"I saw a great big UFO I did"
    },{
        id: 2,
        sighted_at: "19961010",
        reported_at: "19961111",
        location:"Utah",
        shape:"oblong",
        duration:"10 minutes",
        description:"It was a massive load of flashing lights"
    },{
        id: 3,
        sighted_at: "19961010",
        reported_at: "19961111",
        location:"Utah",
        shape:"oblong",
        duration:"10 minutes",
        description:"I don't know what it was"
    },{
        id: 4,
        sighted_at: "19961010",
        reported_at: "19961111",
        location:"Utah",
        shape:"oblong",
        duration:"10 minutes",
        description:"All the clocks stopped"
    },{
        id: 5,
        sighted_at: "19961010",
        reported_at: "19961111",
        location:"Utah",
        shape:"oblong",
        duration:"10 minutes",
        description:"Definitely some rectal coring occurred"
    }
];