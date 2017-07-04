
var protobufjs = require("./socket_protobufjs");
var msgid2proto = require("./protocol").msgid2proto;
var sockets = {};

var URL_LOGIN = "ws://192.168.0.109:9100";

var _isHandling = false;
var msgQueue    = [];

var handleQueue = function() {
    if (_isHandling == false) {
        _isHandling = true;
        setInterval(function() {
            if (msgQueue.length > 0) {
                console.log("msgQueue.length: " + msgQueue.length)
                var msg = msgQueue.shift();

                var eventname = msgid2proto[msg.id]
                if (eventname) {
                    var listener = listeners[eventname]
                    if (listener) {
                        listener(msg);
                    }
                }
            }
        }, 1000)
    }
}

var listeners = {}

cc.Class({
    statics: {
        on: function(eventname, listener) {
            if (listeners[eventname] == null) {
                listeners[eventname] = listener;
            }
        },
        off: function(eventname) {
            if (listeners[eventname]) {
                listeners[eventname] = null;
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
            // start 适配
            var buffer = data.buffer;
            var bufferArray = Object.keys(buffer).map(function(k) {
                return buffer[k];
            });
            // end 适配

            var msg = protobufjs.decode(data.id, bufferArray);
            msg.id = data.id;
            msgQueue.push(msg);
        },
        send: function(msgid, rawData) {
            var socket = null;
            if (msgid >= 100 && msgid < 500) {
                socket = sockets.login;
            }

            if (socket == null) {
                console.log("socket = null");
                return;
            }

            var buffer = protobufjs.encode(msgid, rawData);
            socket.emit("message", {id: msgid, buffer: buffer});
        }
    }
});