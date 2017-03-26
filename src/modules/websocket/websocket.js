/**
 * Created by zkp on 2017/3/23.
 */
module.exports = {
    init:function(){
        //websocket连接
        var websocket = new WebSocket('ws://' + location.hostname + ':8888/');
        websocket.onopen = function(e){
            console.log('websocket opened');
        };
        websocket.onerror = function(e){
            console.log('websocket error' + e)
        };
        websocket.onmessage = function(e){
            var message = e.data;
            console.log(message);
        };
        websocket.onclose = function(e){
            console.log('websocket closed');
        };
        window.websocket = websocket;
    }
};
