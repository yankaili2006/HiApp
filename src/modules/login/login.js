require('./login.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service'),
    template = require('./login.tpl.html');

module.exports = {
    init: function(){
        appFunc.hideToolbar();
    }
};
