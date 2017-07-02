var Protojs = require("./Protojs");

var MsgHandler = require("../net/MsgHandler");

cc.Class({
    ctor: function() {
        this._url = "ws://192.168.0.109:9100";

        this._protojs = new Protojs();
    },

    init: function(stage) {
        if (stage == "login") {
            this._protojs.init("login");
        } else if (stage == "lobby") {

        } else {

        }
    },

    closeConnect: function() {
        if (this._socket) {
            this._socket.disconnect();
            this._socket = null;
        }
    },

    makeConnect: function(url) {
        url = url ? url : this._url;

        var opts = {
            'reconnection': false,
            'force new connection': true,
            'transports':['websocket', 'polling']
        }

        console.log("connect url: " + url);
        var socket = io.connect(url, opts);
        this._socket = socket;

        socket.on("connect", function(data) {
            console.log("connect connect");
        });

        socket.on("disconnect", function(data) {
            console.log("disconnect disconnect");
        });

        socket.on("message", function(data) {

        });
    },

    sendMsgReq: function(id, rawData, xMessage, onAck) {
        if (this._socket == null) {
            console.log("socket 错误");
            return;
        }
        MsgHandler.getInstance().on(id + 1, onAck);
        var buffer = this._protojs.getBuffer(rawData, xMessage);
        this._socket.emit("message", {id: id, buffer: buffer});
    }
});

