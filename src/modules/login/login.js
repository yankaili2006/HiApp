var appFunc = require('../utils/appFunc'),
    service = require('./service');

module.exports = {
    init: function(){
    },
    login: function(options, callback){
        service.login(options, callback);
    }
};
