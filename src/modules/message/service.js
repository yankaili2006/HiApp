var xhr = require('../utils/xhr');

module.exports = {
    getAnswers: function(callback) {
        xhr.simpleCall({
            func: 'answers'
        }, function (res) {
            callback(res.data);
        });
    },
    //get answers for xwl
    getAnswersForXWL: function(callback){
        xhr.simpleCallForXWL({
            func: 'answers'
        },function(res){
            callback(res.data);
        });
    },
    getMessages: function(callback){
        xhr.simpleCall({
            func:'message'
        },function(res) {
            callback(res.data);
        });
    },
    //get Message fro xwl
    getMessagesForXWL: function(callback){
        xhr.simpleCallForXWL({
            func: 'message'
        },function(res){
            callback(res.data);
        });
    }
};