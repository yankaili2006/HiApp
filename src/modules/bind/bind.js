require('./bind.less');

var appFunc = require('../utils/appFunc'),
    template = require('./bind.tpl.html');
var xhr = require('../utils/xhr');

var bindModule = {
    openBindPopup: function(){

        var output = appFunc.renderTpl(template, {
            send_placeholder: i18n.index.send_placeholder
        });
        hiApp.popup(output);

        var bindings = [{
            element: '#bindBtn',
            event: 'click',
            handler: bindModule.bindUser
        },];

        appFunc.bindEvents(bindings);
    },
    bindUser: function(){
        var username = $$('input[name=username]').val();
        var password = $$('input[name=password]').val();
        var openid = localStorage.openid;
        if(null === openid || openid === undefined || openid === ''){
            hiApp.alert('非微信端访问');
            return;
        }
        hiApp.showPreloader(i18n.index.sending);
        xhr.simpleCallForXWL({
            func:'bindWeixinUser',
            query:{
                username: username,
                password: password,
                openid: openid
            }
        },function(res){
            hiApp.hidePreloader();
            var result = res.result;
            if(result === '00'){
                hiApp.alert('绑定成功');
                setTimeout(function () {
                    hiApp.closeModal('.bind-popup');
                    //Refresh Timeline
                }, 1300);
            }else{
                hiApp.alert('绑定失败');
            }
        });
    }
};

module.exports = bindModule;