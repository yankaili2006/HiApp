var xhr = require('../utils/xhr');

module.exports = {
    loadContacts: function(callback) {
        xhr.simpleCall({
            func: 'contacts'
        }, function (res) {
            callback(res.data);
        });
    },
    //讯物联查询卡号列表
    loadContactsForXWL: function (callback) {
        xhr.simpleCallForXWL({
            func: 'getCardList'
        }, function(res){
            callback(res.data);
        });
    }
};