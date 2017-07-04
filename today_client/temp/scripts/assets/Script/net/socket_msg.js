"use strict";
cc._RF.push(module, '423a2j+rHdIe6z0ClOG1mBz', 'socket_msg');
// Script/net/socket_msg.js

"use strict";

var protobufjs = require("./socket_protobufjs");
var msgid2proto = require("./protocol").msgid2proto;
var sockets = {};

var URL_LOGIN = "ws://192.168.0.109:9100";

var _isHandling = false;
var msgQueue = [];

var handleQueue = function handleQueue() {
    if (_isHandling == false) {
        _isHandling = true;
        setInterval(function () {
            if (msgQueue.length > 0) {
                console.log("msgQueue.length: " + msgQueue.length);
                var msg = msgQueue.shift();

                var eventname = msgid2proto[msg.id];
                if (eventname) {
                    var listener = listeners[eventname];
                    if (listener) {
                        listener(msg);
                    }
                }
            }
        }, 1000);
    }
};

var listeners = {};

cc.Class({
    statics: {
        on: function on(eventname, listener) {
            if (listeners[eventname] == null) {
                listeners[eventname] = listener;
            }
        },
        off: function off(eventname) {
            if (listeners[eventname]) {
                listeners[eventname] = null;
            }
        },
        closeSocket: function closeSocket(stage) {
            if (sockets.login) {
                sockets.login.disconnect();
            }
        },
        connectLoginServer: function connectLoginServer(url) {
            url = url ? url : URL_LOGIN;
            var Scon = require("./socket_connect");
            var scon = new Scon();
            sockets.login = scon.makeConnect(url, "login");
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
            var buffer = data.buffer;
            var bufferArray = Object.keys(buffer).map(function (k) {
                return buffer[k];
            });

            var msg = protobufjs.decode(data.id, bufferArray);
            msg.id = data.id;
            msgQueue.push(msg);
        },
        send: function send(msgid, rawData) {
            var socket = null;
            if (msgid >= 100 && msgid < 500) {
                socket = sockets.login;
            }

            if (socket == null) {
                console.log("socket = null");
                return;
            }

            var buffer = protobufjs.encode(msgid, rawData);
            socket.emit("message", { id: msgid, buffer: buffer });
        }
    }
});

cc._RF.pop();