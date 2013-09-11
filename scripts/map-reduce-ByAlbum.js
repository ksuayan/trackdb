db.trackdbs.mapReduce(
    function() {
        emit(this.Album,1);
    },
    function(k,values){
        return Array.sum(values);
    },
    {
        out: {replace:"ByAlbums"}
    }
);