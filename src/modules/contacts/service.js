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

        xhr.simpleCallForXWL({
            func: 'appqry/getCardList',
            query: {
                userId: localStorage.uid
            }
        }, function(res){
            var data = service.convert(res);
            callback(data);
        });
    },
    // convert the xwl backend json to frontend json
    convert: function(data){
        var result = [];
        if(data.result !== '00')
            return result;
        for(var segment in data){
            if(segment !== 'result'){
                //segment
                var cardarray = data[segment];
                for(var i = 0; i < cardarray.length; i++){
                    cardarray[i].cardsegment = segment;
                    if(i === 0){
                        cardarray[i].header = segment;
                    }
                    result.push(cardarray[i]);
                }
            }
        }

        return result;
    }
};

module.exports = service;