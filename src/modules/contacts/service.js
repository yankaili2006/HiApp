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
    loadContactsForXWL: function (pageNum, pageSize, callback) {

        xhr.simpleCallForXWL({
            func: 'appqry/getCardList',
            query: {
                userId: localStorage.userId,
                pno: pageNum,
                psize: pageSize
            }
        }, function(res){
            if(res.result !== '00'){
                alert('getCardList wrong!');
                return;
            }
            var dataMap_convert = service.convert(res.dataMap);
            res.dataMap_convert = dataMap_convert;
            callback(res);
        });
    },
    // convert the xwl backend json to frontend json
    convert: function(dataMap){
        var result = [];
        for(var segment in dataMap){
                //segment
                var cardarray = dataMap[segment];
                for(var i = 0; i < cardarray.length; i++){
                    cardarray[i].cardsegment = segment;
                    if(i === 0){
                        cardarray[i].header = segment;
                    }
                    result.push(cardarray[i]);
                }
        }

        return result;
    }
};

module.exports = service;