var xhr = require('../utils/xhr');
var loginModule = require('../login/login');
var appFunc = require('../utils/appFunc');

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
        var userId = localStorage.uid;
        var startDate = '19700101';
        var endDate = appFunc.getYYYYMMDD();
        var pno = '1';
        var psize = '100000';
        xhr.simpleCallForXWL({
            func: 'getmsg',
            query: {
                'userId': userId,
                'msisdn': cardno,
                'startDate': startDate,
                'endDate': endDate,
                'pno': pno,
                'psize': psize
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
                'userId': localStorage.uid,
                'msisdn': cardno,
                'content': content
            }
        },function(res){
            callback(res);
        });
    }

};
module.exports = service;