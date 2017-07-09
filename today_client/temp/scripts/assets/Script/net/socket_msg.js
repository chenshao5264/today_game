"use strict";
cc._RF.push(module, '423a2j+rHdIe6z0ClOG1mBz', 'socket_msg');
// Script/net/socket_msg.js

"use strict";

var protobufjs = require("./socket_protobufjs");
var sockets = {};

var URL_LOGIN = "ws://127.0.0.1:9100";

var _isHandling = false;
var msgQueue = [];

var handleQueue = function handleQueue() {
    if (_isHandling == false) {
        _isHandling = true;
        setInterval(function () {
            if (msgQueue.length > 0) {
                var msg = msgQueue.shift();
                var listener = listeners[msg.msgid];
                if (listener) {
                    console.log("hande msgid = " + msg.msgid);
                    listener(msg);
                } else {
                    console.log("un hande msgid = " + msg.msgid);
                }
            }
        }, 100);
    }
};

var listeners = {};

cc.Class({
    statics: {
        on: function on(eventid, listener) {
            if (listeners[eventid] == null) {
                listeners[eventid] = listener;
            }
        },
        off: function off(eventid) {
            if (listeners[eventid]) {
                listeners[eventid] = null;
            }
        },
        closeSocket: function closeSocket(stage) {
            if (sockets.login) {
                sockets.login.disconnect();
            }
        },
        connectLoginServer: function connectLoginServer(url) {
            url = url ? url : URL_LOGIN;
            var Sser = require("./socket_service");
            var sser = new Sser();
            sockets.login = sser.makeConnect(url, "login");
        },
        onConnected: function onConnected(data, stage) {
            console.log("connect: " + stage);

            handleQueue();
        },
        onDisconnect: function onDisconnect(data, stage) {
            console.log("disconnect: " + stage);
            sockets.login = null;
        },
        onMessage: function onMessage(data) {
            var bufferArray = new Uint8Array(data);
            var msg = protobufjs.decode(bufferArray);
            msgQueue.push(msg);
        },
        send: function send(packet) {
            var socket = null;
            var msgid = packet.msgid;
            if (msgid >= 100 && msgid < 500) {
                socket = sockets.login;
            }

            if (socket == null) {
                console.log("socket = null");
                return;
            }

            packet = protobufjs.encode(packet);
            socket.emit("message", packet);
        }
    }
});

cc._RF.pop();