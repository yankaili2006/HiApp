require('./contacts.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service'),
    template = require('./contacts.tpl.html');

var contacts = {
    init: function(){
        contacts.bindEvents();
    },
    //xwl load card list
    loadContactsForXWL:function(){
        if(contacts.beforeLoadContacts()) {
            hiApp.searchbar('#contactView .searchbar',{
                searchList: '.contacts-list',
                searchIn: '.item-title'
            });

            service.loadContactsForXWL(1,10,function(c){
                setTimeout(function(){
                    var renderData = {
                        contacts: c.dataMap_convert
                    };
                    var output = appFunc.renderTpl(template, renderData);
                    $$('#contactView .contacts-list ul').html(output);
                    //设置当前页数，总页数
                    $$('#contactView .infinite-scroll').data('curPageNum',1);
                    $$('#contactView .infinite-scroll').data('totalPageNum', c.totalPageNum);
                    $$('#contactView .infinite-scroll').data('totalResultNum', c.totalResultNum);
                    hiApp.hideIndicator();

                },500);
            });
        }
    },
    loadContacts: function(){
        if(contacts.beforeLoadContacts()) {
            hiApp.searchbar('#contactView .searchbar',{
                searchList: '.contacts-list',
                searchIn: '.item-title'
            });

            service.loadContacts(function(c){
                setTimeout(function(){
                    var renderData = {
                        contacts: c
                    };
                    var output = appFunc.renderTpl(template, renderData);
                    $$('#contactView .contacts-list ul').html(output);

                    hiApp.hideIndicator();

                },500);
            });
        }
    },
    beforeLoadContacts: function(){
        if($$('#contactView .contacts-list .list-group .contact-item').length > 0) {
            return false;
        }else {
            hiApp.showIndicator();
            return true;
        }
    },
    infiniteContacts: function(){
        var curPageNum = $$('#contactView .infinite-scroll').data('curPageNum');
        var totalPageNum = $$('#contactView .infinite-scroll').data('totalPageNum');
        if(curPageNum === totalPageNum){
            return;
        }
        hiApp.showIndicator();
        service.loadContactsForXWL(curPageNum + 1, 10, function(c){
            setTimeout(function(){
                var renderData = {
                    contacts: c
                };
                var output = appFunc.renderTpl(template, renderData);
                //$$('#contactView .contacts-list ul').html(output);
                //设置当前页数，总页数
                $$('#contactView .infinite-scroll').data('curPageNum',curPageNum + 1);
                $$('#contactView .infinite-scroll').data('totalPageNum', c.totalPageNum);
                $$('#contactView .infinite-scroll').data('totalResultNum', c.totalResultNum);
                $$('#contactView  .contacts-list ul').append(output);
                hiApp.hideIndicator();

            },500);
        });

    },
    bindEvents: function(){
        var bindings = [{
            element: '#contactView',
            event: 'show',
            handler: contacts.loadContactsForXWL
        },
            {
                element: '#contactView',
                selector: '.infinite-scroll',
                event: 'infinite',
                handler: this.infiniteContacts
            }];

        appFunc.bindEvents(bindings);
    }
};

module.exports = contacts;
