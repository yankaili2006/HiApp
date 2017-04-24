var xhr = require('../utils/xhr');

var service = {
    getTimeline: function(pno, callback){
        xhr.simpleCallForXWL({
            func:'appbusi/getmsggroup',
            query:{
                userId: localStorage.userId,
                pno:pno,
                psize:10
            }
        },function(res){
            callback(res);
        });
    },
    refreshTimeline: function(callback){
        xhr.simpleCall({
            func:'refresh_timeline'
        },function(res){
            callback(res.data);
        });
    },
    infiniteTimeline: function(callback){
        xhr.simpleCall({
            func:'more_timeline'
        },function(res){
            callback(res.data);
        });
    }
};

module.exports = service;