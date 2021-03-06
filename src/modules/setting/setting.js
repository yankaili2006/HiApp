require('./setting.less');

var appFunc = require('../utils/appFunc'),
    template = require('./setting.tpl.html'),
    bindModule = require('../bind/bind');

var settingView = {
    init: function(){
        settingView.bindEvents();
    },
    renderSetting: function(){
        if($$('#settingView .page-content')[0]) return;
        hiApp.showIndicator();
        var username = localStorage.userName;
        var renderData = {
            nickName: username
        };

        var output = appFunc.renderTpl(template, renderData);
        $$('#settingView .page[data-page="setting"]').html(output);

        hiApp.hideIndicator();
    },
    unbind: function(){
        hiApp.confirm(i18n.setting.confirm_logout,function(){
            bindModule.unbindUser();
            //settingF7View.router.loadPage('page/login.html');
            //hiApp.showTab('#ourView');
            //loginModule.clearUser();
            //hiApp.loginScreen();
        });
    },
    bindEvents: function(){
        var bindings = [{
            element: '#settingView',
            event: 'show',
            handler: settingView.renderSetting
        },{
            element: '#settingView',
            selector: '.logout-button',
            event: 'click',
            handler: settingView.unbind
        },{
            element: '#settingView',
            selector: '.update-button',
            event: 'click',
            //handler: settingView.checkVersion
        },{
            element: '#settingView',
            selector: '.open-bind-popup',
            event: 'click',
            handler: bindModule.openBindPopup
        }];
        appFunc.bindEvents(bindings);
    }
};

module.exports = settingView;