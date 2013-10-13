App = Ember.Application.create();

/*
App.Store = DS.Store.extend({
    revision: 13,
    adapter: DS.FixtureAdapter.create()
});*/

App.Router.map(function(){
    this.resource("sightings", { path : "/" }, function(){
        this.resource("sighting", {path:"sightings/:sighting_id"})
    });

});

App.SightingsRoute = Ember.Route.extend({
    model: function (params) {
        var page = params.page || 0;
        return this.get("store").findQuery("sighting", {
            limit : 10,
            offset : page * 10
        });
    }
});

App.SightingRoute = Ember.Route.extend({
    model: function(params) {
        return this.get("store").find("sighting", params.sighting_id);
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

Ember.Handlebars.helper('truncate', function(value, options) {
    return value.length > 100
        ?  value.substring(0, 100) + "..."
        : value;
});
