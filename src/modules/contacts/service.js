var xhr = require('../utils/xhr');

module.exports = {
    loadContacts: function(callback) {
        xhr.simpleCall({
            func: 'contacts'
        }, function (res) {
            callback(res.data);
        });
    },
    //Ѷ������ѯ�����б�
    loadContactsForXWL: function (callback) {
        xhr.simpleCallForXWL({
            func: 'getCardList'
        }, function(res){
            callback(res.data);
        });
    }
};