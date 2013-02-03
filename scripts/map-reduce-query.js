<<<<<<< HEAD
var mongodb = require('mongodb');

// Connect to the db
mongodb.connect("mongodb://127.0.0.1:27017/itunes", function(err, db) {
    if(!err) {
        console.log("We are connected");
        var collection = db.collection('trackdbs');
        var map = function() {
            emit(this.Genre, 1);
        };
        // Reduce function
        var reduce = function(previous, current) {
            var count = 0;
            for(index in current) {//in this example, 'current' will only have 1 index and the 'value' is 1
                count += current[index];
                //increments the counter by the 'value' of 1
            }
            return count;
        };
        collection.mapReduce(map, reduce, {out : {replace : "genres"}});
        db.close();
    } else {
        console.log("error", err);
    }
});
=======
var mongodb = require('mongodb');

mongodb.connect("mongodb://localhost:27017/itunes", function(err, db) {
    if(!err) {
        console.log("We are connected.");
        var collection = db.collection('trackdbs');
        var map = function() {
            emit(this.Genre, 1);
        };
        var reduce = function(previous, current) {
            var count = 0;
            for(index in current) {
                count += current[index];
            }
            return count;
        };
        collection.mapReduce(map, reduce, {out : {replace : "genres"}});
        db.close();
    } else {
        console.log("error", err);
    }
});
>>>>>>> update to Mongoose 3.5.5
