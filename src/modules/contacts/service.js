var xhr = require('../utils/xhr');
var loginModule = require('../login/login');
var service = {
    loadContacts: function(callback) {
        xhr.simpleCall({
            func: 'contacts'
        }, function (res) {
            callback(res.data);
        });
    },
    //xwl load card list
    loadContactsForXWL: function (callback) {
        var userId = loginModule.getUser().USER_ID;
        xhr.simpleCallForXWL({
            func: 'getCardList',
            query: {
                userId: userId
            }
        }, function(res){
            var data = service.convert(res);
            callback(data);
        });
    },
    // convert the xwl backend json to frontend json
    convert: function(data){
        var result = [];
        var cards3815 = data["3815"];
        for(var i = 0; i < cards3815.length; i++){
            result[i] = {
                cardno : cards3815[i],
                cardsegment : '3815'
            };
            if(i == 0){
                result[i].header = '3815';
            }
        }
        var cards3833 = data["3833"];
        for(var j = 0; j < cards3833.length; j++){
           result[i + j ] = {
               cardno : cards3833[j],
               cardsegment : '3833'
           };
            if(j == 0){
                result[i + j].header = '3833';
            }
        }
        return result;
    }
};

module.exports = service;