var appFunc = require('../utils/appFunc'),
    xhr = require('../utils/xhr');

module.exports = {
    init: function(){
    },
    login: function(options, callback){
        var that = this;
        xhr.simpleCallForXWL({
            func:'login',
            query: {
                username : options.username,
                password : options.password
            }
        },function(res){
            if(res.result === '00'){
                that.setUser(res.user);
            }
            callback(res);
        });
    },
    setUser: function(user){
        localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser:function(){
        localStorage.removeItem('user');
    },
    getUser: function(){
        return JSON.parse(localStorage.getItem('user'));
    }
};
