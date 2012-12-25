var mongodb = require('mongodb');

// Connect to the db
mongodb.connect("mongodb://127.0.0.1:27017/itunes", function(err, db) {
  if(!err) {
    console.log("We are connected");
    
    var collection = db.collection('trackdbs');
    
   // Map function
   var map = function() { 
       emit(this.Genre, {count:1}); 
   };
   
   // Reduce function
   var reduce = function(key, values) {
        var sum = 0;
        values.forEach(function(doc) {
            sum += doc.count;
        });
        return {count:sum};
    };
    
    /*
    var stream = collection.find({Artist:"New Order"},{_id:0,Album:1,Name:1}).streamRecords();
    stream.on("data", function(item) {
        console.log("item",item);
    });
    stream.on("end", function() {
        console.log("done.");
    });
    */
   
    collection.mapReduce(map, reduce, {out: {replace:"mapReduceResults"}});
    
    /*
    var res = collection.mapReduce(map, reduce, {out : {inline : 1}}, function(err, results) {
        if(err) {
            console.log(err);
        } else {
            console.log(results[0].value.items);
        }
    });
    */

    
    db.close();
  } else {
    console.log("error",err);
  }
});