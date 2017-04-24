require('./home.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./home.tpl.html'),
    inputModule = require('../input/input');

var home = {
    init: function(){
        this.getTimeline();
        this.bindEvent();
    },
    getTimeline: function(){
        var that = this;
        hiApp.showIndicator();
        service.getTimeline(1, function(tl){
            home.renderTimeline(tl.dataList);
            //设置当前页数，总页数
            $$('#homeView .infinite-scroll').data('curPageNum',1);
            $$('#homeView .infinite-scroll').data('totalPageNum', tl.totalPageNum);
            $$('#homeView .infinite-scroll').data('totalResultNum', tl.totalResultNum);

            hiApp.hideIndicator();
            //Unlock scroll loading status
            var ptrContent = $$('#homeView').find('.pull-to-refresh-content');
            ptrContent.data('scrollLoading','unloading');
        });
    },
    refreshTimeline: function(){
        home.getTimeline();
        hiApp.pullToRefreshDone();
    },
    infiniteTimeline: function(){
        var curPageNum = $$('#homeView .infinite-scroll').data('curPageNum');
        var totalPageNum = $$('#homeView .infinite-scroll').data('totalPageNum');
        if(curPageNum === totalPageNum){
            return;
        }
        var $this = $$(this);
        hiApp.showIndicator();
        service.getTimeline(curPageNum + 1, function(tl){
                setTimeout(function() {
                    home.renderTimeline(tl.dataList, 'append');
                    //设置当前页数，总页数
                    $$('#homeView .infinite-scroll').data('curPageNum', curPageNum + 1);
                    $$('#homeView .infinite-scroll').data('totalPageNum', tl.totalPageNum);
                    $$('#homeView .infinite-scroll').data('totalResultNum', tl.totalResultNum);
                    hiApp.hideIndicator();
                },500);
        });
    },
    refreshTimelineByClick: function(){
        setTimeout(function(){
            $$('#homeView .refresh-click').find('i').addClass('ios7-reloading');
        },350);

        $$('#homeView .pull-to-refresh-content').scrollTop(0,300);

        hiApp.pullToRefreshTrigger('#homeView .pull-to-refresh-content');
    },
    showLoadResult: function(text){
        setTimeout(function(){
            $$('#homeView .load-result').html(text).css('opacity','1').transition(1000);

            setTimeout(function(){
                $$('#homeView .load-result').css('opacity','0').transition(1000);
            },2100);
        },400);
    },
    refreshItemTime:function(){
        $$('#homeView').find('.card .ks-facebook-date').each(function(){
            var nowTime = appFunc.timeFormat($$(this).data('time'));
            $$(this).html(nowTime);
        });
    },
    photoBrowser: function(){

        var url = $$(this).attr('src');

        var myPhotoBrowser = hiApp.photoBrowser({
            photos: [url],
            toolbar: false,
            backLinkText: i18n.global.close
        });

        myPhotoBrowser.open();

    },
    renderTimeline: function(tl, type){
        var renderData = {
            timeline: tl
        };
        var output = appFunc.renderTpl(template, renderData);
        if(type === 'prepend'){
            $$('#homeView').find('.home-timeline').prepend(output);
        }else if(type === 'append') {
            $$('#homeView').find('.home-timeline').append(output);
        }else {
            $$('#homeView').find('.home-timeline').html(output);
        }
    },
    openItemPage: function(e){
        if(e.target.nodeName === 'A' || e.target.nodeName === 'IMG'){
            return false;
        }
        var itemId = $$(this).data('id');
        //homeF7View.router.loadPage('page/tweet.html?id=' + itemId);
        homeF7View.router.loadPage('page/message.html?nickname=' + itemId + '&source=home');
    },
    bindEvent: function(){

        var bindings = [{
            element: '#homeView',
            selector: '.pull-to-refresh-content',
            event: 'refresh',
            handler: this.refreshTimeline
        },{
            element: '#homeView',
            selector: '.pull-to-refresh-content',
            event: 'infinite',
            handler: this.infiniteTimeline
        },{
            element: '#homeView',
            selector: '.refresh-click',
            event: 'click',
            handler: this.getTimeline
        },{
            element: '#homeView',
            selector: '.home-timeline .ks-facebook-card',
            event: 'click',
            handler: this.openItemPage
        }];

        appFunc.bindEvents(bindings);
    }
};

module.exports = home;