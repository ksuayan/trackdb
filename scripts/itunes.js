/*
 * 1. Convert "Library.xml" to JSON via plist-to-json (NPM).
 * 2. Load JSON to memory and send to MongoDB!
 */
var parsedJSON = require('../data/Library.json');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    ObjectId = Schema.ObjectId;

var TrackDb = new Schema({},{strict:false});
var tracks = parsedJSON[0]["Tracks"];

var onConnection = function() {
	console.log("Connected.");
	
	for (var trackID in tracks) {
	    var track = tracks[trackID];
	    var record = new itunes.TrackModel(track);
	    console.log(trackID, tracks[trackID].Name );
	    record.save(function (err) {
	  		if (err) return handleError(err);
		});
	};
	mongoose.connection.close();
	process.exit(code=0);
};

var iTunesDB = function(){
    console.log("Init iTunesDB.");
    mongoose.connect('mongodb://localhost/itunes', {db:{safe:true}});
    mongoose.set('debug', true);
    
	this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'Connection error.'));
    this.db.once('open', onConnection);
    this.TrackModel = this.db.model('trackdbs', TrackDb);
};

var itunes = new iTunesDB();
