var documents = require('../data/content.json');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    ObjectId = Schema.ObjectId;
    
var connectionURL ='mongodb://localhost/site';
var collectionName = "doc";
var ContentSchema = new Schema({},{strict:false});

var onConnection = function() {
	console.log("Connected.");
	var docs = documents["docs"];
	console.log("doc", docs.length);
	
	for (var i=0,n=docs.length; i<n; i++) {
	    var record = new content.ContentModel(docs[i]);
	    record.save(function (err) {
	  		if (err) return handleError(err);
	  		console.log(i,"/",n, record);
		});
	};
};

var ContentDB = function(){
    console.log("Init ContentDB.");
    mongoose.connect(connectionURL, {db:{safe:true}});
    mongoose.set('debug', true);
    
	this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'Connection error.'));
    this.db.once('open', onConnection);
    this.ContentModel = this.db.model(collectionName, ContentSchema);
};

var content = new ContentDB();

// mongoose.connection.close();
// process.exit(code=0);  		