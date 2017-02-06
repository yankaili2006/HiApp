var xhr = require('../utils/xhr');

var service = {
    getTimeline: function(callback){
        xhr.simpleCallForXWL({
            func:'getmsggroup'
        },function(res){
            var data = service.convertTimeline(res);
            callback(data);
        });
    },
    convertTimeline: function(data){
        var res = [];
        for(tl in data){
            if(tl !== 'result'){
                if(data[tl].length > 0){
                    data[tl][0]["length"] = data[tl].length;
                    res.push(data[tl][0]);
                }
            }
        }
        return res;
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