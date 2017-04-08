require('framework7');
require('../style/less/app.less');
//var socketModule = require('./websocket/websocket');

var appFunc = require('./utils/appFunc'),
    appService = require('./services/appService'),
    router = require('./router'),
    index = require('./app/app'),
    loginModule = require('./login/login');

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        if(appFunc.isPhonegap()) {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        }else{
            window.onload = this.onDeviceReady();
        }
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(event) {
        switch (event) {
            case 'deviceready':
                app.initMainView();
                break;
        }
    },
    initMainView:function(){
        var lang = appService.getLocal();

        switch (lang){
            case 'en-us':
                require(['./lang/en-us'], function(lang){
                    window.i18n = lang;
                    app.initFramework7();
                });
                break;
            case 'zh-cn':
                require(['./lang/zh-cn'], function(lang){
                    window.i18n = lang;
                    app.initFramework7();
                });
                break;
        }

    },
    initFramework7: function(){

        //Register custom Template7 helpers
        Template7.registerHelper('t', function (options){
            var key = options.hash.i18n || '';
            var keys = key.split('.');

            var value;
            for (var idx = 0, size = keys.length; idx < size; idx++)
            {
                if (value != null)
                {
                    value = value[keys[idx]];
                } else {
                    value = i18n[keys[idx]];
                }

            }
            return value;
        });

        window.$$ = Dom7;
        window.hiApp = new Framework7({
            pushState: false,
            popupCloseByOutside:false,
            animateNavBackIcon: true,
            modalTitle: i18n.global.modal_title,
            modalButtonOk: i18n.global.modal_button_ok,
            modalButtonCancel: i18n.global.cancel,
            preroute: function(view, options){
                return true;
            },
            template7Pages: true,
            template7Data: {
                'page:item': {
                    back: i18n.global.back,
                    title: i18n.item.title,
                    comment: i18n.timeline.comment,
                    forward: i18n.timeline.forward
                },
                'page:message': {
                    chat: i18n.chat.title,
                    chatPlaceholder: i18n.chat.chatPlaceholder,
                    send: i18n.global.send
                },
                'page:feedback': {
                    feedBack: i18n.setting.feed_back,
                    feedBackPlaceholder: i18n.setting.feed_back_placeholder
                },
                'page:about': {
                    appName: i18n.app.name,
                    about: i18n.setting.about
                },
                'page:language': {
                    back: i18n.global.back,
                    done: i18n.global.done,
                    switchLanguage: i18n.global.switch_language
                },
                'page:login':{
                    login: i18n.login.login_btn
                }
            }
        });

        window.homeF7View = hiApp.addView('#homeView', {
            dynamicNavbar: true
        });

        window.contactF7View = hiApp.addView('#contactView', {
            dynamicNavbar: true
        });

        window.settingF7View = hiApp.addView('#settingView', {
            dynamicNavbar: true
        });

        //读取cookie,如果存在uid和openid,那么说明是在微信端打开的网页，则表明已登录
        //如果uid是test则表明为测试账号
        var userId = appFunc.getCookie('userId');
        var openId = appFunc.getCookie('openId');
        var userName = appFunc.getCookie('userName');
        console.log('userId:' + userId);
        console.log('openid:' + openId);
        console.log('userName:' + userName);

        localStorage.userId = userId;
        localStorage.openId = openId;
        localStorage.userName = userName;

        // init app
        router.init();
        index.init();
    }
};

app.initialize();

//websocket
//var socket = new WebSocket('ws://' + location.hostname + ':8888/');
//socket.onopen = function(e){
//    console.log('open');
//};
//socket.onclose = function(e){
//    console.log('close');
//};
//socket.onerror = function(e){
//    console.log('error');
//};
//window.mymessages = [];
//socket.onmessage = function(e){
//    var message = e.data;
//    //var node = document.createTextNode(message);
//    //var div = document.createElement('div');
//    //div.appendChild(node);
//    //document.body.insertBefore(div, input);
//    //input.scrollIntoView();
//    console.log(message);
//    window.mymessages.push(message);
//    //socket.send('echo--' + message);
//};
//window.mysocket = socket;

