(function (){

App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api'
});

App.Router.map(function(){
    this.resource("sightings", function(){
        this.resource("sighting", {path:":sighting_id"})
    });
});

function getSightings(limit, offset){
    var store = this.get("store");
    var s = store.findQuery("sighting", {
        limit : limit,
        offset : offset
    });
    return s;
}

App.IndexRoute = Ember.Route.extend({
    model : function(){
        return getSightings.call(this,10,0);
    }
});

App.SightingsRoute = Ember.Route.extend({
    model: function (params) {
        console.log(params);
        var page = params.page || 0;
        return getSightings.call(this, 10, (page*10));
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

Ember.Handlebars.helper('parseDate', function(value) {
    var regex = /^([0-9]{4})([0-9]{2})([0-9]{2})$/;
    var match = value.match(regex);
    return match.length === 4
        ? (match[3] + "-" + match[2] + "-" + match[1])
        : value;
});


}());