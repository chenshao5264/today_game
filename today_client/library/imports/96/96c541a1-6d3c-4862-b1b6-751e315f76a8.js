"use strict";
cc._RF.push(module, '96c54GhbTxIYrG2dR4xX3ao', 'socket_connect');
// Script/net/socket_connect.js

'use strict';

var smsg = require("./socket_msg");

cc.Class({
    ctor: function ctor() {},

    closeConnect: function closeConnect() {
        if (this._socket) {
            this._socket.disconnect();
            this._socket = null;
        }
    },

    makeConnect: function makeConnect(url, stage) {
        var opts = {
            'reconnection': false,
            'force new connection': true,
            'transports': ['websocket', 'polling']
        };

        console.log("connect url: " + url);
        var socket = io.connect(url, opts);

        socket.on("connect", function (data) {
            smsg.onConnected(data, stage);
        });

        socket.on("disconnect", function (data) {
            smsg.onDisconnect(data, stage);
        });

        socket.on("message", function (data) {
            //console.log(data);
            smsg.onMessage(data);
        });

        return socket;
    }
});

cc._RF.pop();