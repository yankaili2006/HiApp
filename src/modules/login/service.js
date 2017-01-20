var xhr = require('../utils/xhr');

var service = {
    login: function(options, callback){
        xhr.simpleCallForXWL({
            func:'login',
            query: {
                username : options.username,
                password : options.password
            }
        },function(res){
            callback(res);
        });
    }
};
module.exports = service;