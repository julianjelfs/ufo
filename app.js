
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , sighting = require('./routes/sighting')
  , http = require('http')
  , path = require('path')
    , mongoose = require("mongoose");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

console.log("connecting to mongo on " + process.env.MONGODB_UFO_URI);

mongoose.connect(process.env.MONGODB_UFO_URI);

app.get('/', routes.index);
app.get('/api/sightings', sighting.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
