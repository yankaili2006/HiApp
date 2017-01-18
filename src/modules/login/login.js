require('./login.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service'),
    template = require('./login.tpl.html');

var conversationStarted = false,
    answerTimeout,
    messageLayout,
    cardno;

module.exports = {
    init: function(query){
        var that = this;

        appFunc.hideToolbar();

        var bindings = [{
            element: '.ks-messages-form',
            event: 'submit',
            handler: that.submitMessage
        },{
            element: '.ks-send-message',
            event: 'click',
            handler: that.triggerSubmit
        }];

        appFunc.bindEvents(bindings);

        cardno = query.nickname;
        $$('.chat-name').html(cardno);

        // render messages
        that.renderMessages(cardno);

        // Init Messages
        messageLayout = hiApp.messages('#contactView .messages', {
            autoLayout:true
        });
    },
    renderMessages: function(cardno){
        hiApp.showIndicator();

        service.getMessagesForXWL(cardno, function(m){
            setTimeout(function(){
                var renderData = {
                    message: m
                };
                var output = appFunc.renderTpl(template, renderData);
                $$('.page[data-page="message"] .messages').html(output);

                hiApp.hideIndicator();

            },600);
        });
    },
    submitMessage: function(e){

        e.preventDefault();
        var input = $$(this).find('.ks-messages-input');
        var messageText = input.val();
        if (messageText.length === 0) return;

        // Empty input
        input.val('');

        // Add Message
        messageLayout.addMessage({
            text: messageText,
            type: 'sent',
            day: !conversationStarted ? 'Today' : false,
            time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
        });
        conversationStarted = true;

        // Add answer after timeout
        if (answerTimeout) clearTimeout(answerTimeout);

        // Send msg to xwl server
        service.sendMessageToXWL(cardno, messageText, function(data){
            answerTimeout = setTimeout(function () {
                var result = '';
                if(data.result == '00'){
                    result = '发送成功';
                }else if(data.result == '01'){
                    result = '发送失败';
                }else{
                    result = '发送结果未知';
                }
                messageLayout.addMessage({
                    text: result,
                    type: 'received'
                });
            }, 1000);
        });
    },
    triggerSubmit: function(){
        $$('.ks-messages-form').trigger('submit');
    }
};
