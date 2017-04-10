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
        var openid = localStorage.openId;
        if(null === openid || openid === undefined || openid === ''){
            hiApp.alert('非微信端访问');
            return;
        }
        if(null === username || username === undefined || username === '' || username === 'test'){
            hiApp.alert('当前用户为匿名用户或测试用户，无法绑定微信');
            return;
        }
        hiApp.showPreloader(i18n.index.sending);
        xhr.simpleCallForXWL({
            func:'appuser/bind',
            query:{
                userName: username,
                password: password,
                openId: openid
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
                localStorage.userName = username;
                localStorage.userId = res.userId;
                appFunc.setCookie('userName',username);
                appFunc.setCookie('userId', res.userId);
                window.location.reload();
            }else{
                hiApp.alert('绑定失败');
            }
        });
    },
    unbindUser: function(){
        var openId = localStorage.openId;
        var userId = localStorage.userId;
        if(null === openId || openId === undefined || openId === ''){
            hiApp.alert('非微信端访问');
            return;
        }
        if(null === userId || userId === undefined || userId === '' || userId === 'test'){
            hiApp.alert('当前用户为匿名用户或测试用户，无法解除绑定');
            return;
        }
        hiApp.showPreloader(i18n.index.sending);
        xhr.simpleCallForXWL({
            func:'appuser/unbind',
            query:{
                openId: openId
            }
        },function(res){
            hiApp.hidePreloader();
            var result = res.result;
            if(result === '00'){
                hiApp.alert('解除绑定成功');
                localStorage.userName = '888';
                localStorage.userId = '9b07afa6f8534a1d8a5b887bb561d697';
                appFunc.setCookie('userName','888');
                appFunc.setCookie('userId', '9b07afa6f8534a1d8a5b887bb561d697');
                window.location.reload();
            }else{
                hiApp.alert('解除绑定失败');
            }
        });
    }
};

module.exports = bindModule;