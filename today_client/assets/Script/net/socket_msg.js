
var protobufjs = require("./socket_protobufjs");
var sockets = {};

var URL_LOGIN = "ws://127.0.0.1:9100";

var _isHandling = false;
var msgQueue    = [];

var handleQueue = function() {
    if (_isHandling == false) {
        _isHandling = true;
        setInterval(function() {
            if (msgQueue.length > 0) {
                var msg = msgQueue.shift();
                console.log("hande msgid = " + msg.msgid);
                
                var listener = listeners[msg.msgid];
                if (listener) {
                    listener(msg);
                }
            }
        }, 1000)
    }
}

var listeners = {}

cc.Class({
    statics: {
        on: function(eventid, listener) {
            if (listeners[eventid] == null) {
                listeners[eventid] = listener;
            }
        },
        off: function(eventid) {
            if (listeners[eventid]) {
                listeners[eventid] = null;
            }
        },
        closeSocket: function(stage) {
            if (sockets.login) {
                sockets.login.disconnect()
            }
        },
        connectLoginServer: function(url) {
            url = url ? url : URL_LOGIN;
            var Scon = require("./socket_connect");
            var scon = new Scon();
            sockets.login = scon.makeConnect(url, "login");
        },
        onConnected: function(data, stage) {
            console.log("connect: " + stage);

            handleQueue();
        },
        onDisconnect: function(data, stage) {
            console.log("disconnect: " + stage);
            sockets.login = null;
        },
        onMessage: function(data) {
            // console.log(data);
            // start 适配
            // var buffer = data;
            // var bufferArray = Object.keys(buffer).map(function(k) {
            //     return buffer[k];
            // });
            //let bufferArray = Array.apply([], data);
            let bufferArray = new Uint8Array(data);
            //console.log(bufferArray);
            // end 适配

            var msg = protobufjs.decode(bufferArray);

            console.log(msg);

            msgQueue.push(msg);
        },
        send: function(packet) {
            var socket = null;
            let msgid = packet.msgid;
            if (msgid >= 100 && msgid < 500) {
                socket = sockets.login;
            }

            if (socket == null) {
                console.log("socket = null");
                return;
            }

            console.log(packet);

            var buffer = protobufjs.encode(packet);
            console.log(buffer);
            socket.emit("message", buffer);
        }
    }
});