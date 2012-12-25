/*
 * 1. Convert "Library.xml" to JSON via plist-to-json (NPM).
 * 2. Load JSON to memory and send to MongoDB!
 */
var parsedJSON = require('../data/Library.json');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    ObjectId = Schema.ObjectId;

var TrackDb = new Schema({},{strict:false});

var iTunesDB = function(){
    console.log("Initialize iTunesDB.");
    this.db = mongoose.createConnection('mongodb://localhost/itunes');
    this.TrackModel = this.db.model('TrackDb', TrackDb);
};


var tracks = parsedJSON[0]["Tracks"];
var itunes = new iTunesDB();

for (var trackID in tracks) {
    console.log(trackID);
    
    var track = tracks[trackID];
    var record = new itunes.TrackModel(track);
    record.save();
};

// mongoose.connection.close();
// process.exit(code=0);
