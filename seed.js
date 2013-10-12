/**
 * Created with JetBrains WebStorm.
 * User: julianj
 * Date: 16/08/13
 * Time: 16:00
 * To change this template use File | Settings | File Templates.
 */


var request = require("request"),
    fs = require("fs"),
    byline = require("byline");

var id = 9;
var stream = fs.createReadStream('./data/ufo_awesome.json');
stream = byline.createStream(stream);

stream.on('data', function(line) {
    id += 1;
    console.log("Processing ID " + id);
    request({
        url : "http://localhost:9200/ufos/ufo/" + id,
        method : "PUT",
        body : JSON.stringify(JSON.parse(line))
    }, function(err, res, body){
        if(err){
            console.error(err);
            return;
        }
        if(res.statusCode == 201){
            console.log('that seemed to work')
        } else {
            console.log('error: '+ res.statusCode)
            console.log(body)
        }
    });
});



//stream.pipe(fs.createWriteStream('./output.json'));




