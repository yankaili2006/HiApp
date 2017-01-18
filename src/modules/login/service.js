var xhr = require('../utils/xhr');

var service = {
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
    //get Message for xwl
    getMessagesForXWL: function(cardno, callback){
        xhr.simpleCallForXWL({
            func: 'getmsg',
            query: {
                'userId': 'c2cca0f7153948e8a5241feca653fe28',
                'msisdn': cardno,
                'startDate': '20160101',
                'endDate': '20171201',
                'pno': '1',
                'psize': '10'
            }
        },function(res){
            var list = res.list;
            for(var i = 0; i < list.length; i++){
                list[i].from = "received";
            }
            callback(res.list);
        });
    },

    // send message to xwl
    sendMessageToXWL: function(cardno, content, callback){
        xhr.simpleCallForXWL({
            func: 'sendmsg',
            query: {
                'userId': 'c2cca0f7153948e8a5241feca653fe28',
                'msisdn': cardno,
                'content': content
            }
        },function(res){
            callback(res);
        });
    }

};
module.exports = service;