
var smsg = require("./socket_msg");
var Protojs = require("./Protobufjs");

var _isUpdating = false;
var msgqueue    = [];
var updateQueue = function() {
    if (_isUpdating == false) {
        _isUpdating = true;
        setInterval(function() {
            console.log("1");
        }, 1000)
    }
}

cc.Class({
    ctor: function() {
        this._url = "ws://192.168.0.109:9100";
    },

    closeConnect: function() {
        if (this._socket) {
            this._socket.disconnect();
            this._socket = null;
        }
    },


    makeConnect: function(url, stage) {
        url = url ? url : this._url;

        var opts = {
            'reconnection': false,
            'force new connection': true,
            'transports':['websocket', 'polling']
        }

        console.log("connect url: " + url);
        var socket = io.connect(url, opts);
        this._socket = socket;

        var self = this;

        socket.on("connect", function(data) {
            smsg.onConnected(data);
            smsg.setSocket(stage, socket);
            updateQueue()
        });

        socket.on("disconnect", function(data) {
            smsg.onDisconnect(data);
            smsg.setSocket(stage, null);
            self._socket = null;
        });

        socket.on("message", function(data) {

            var msg = Protojs.decode(data.id, data.buffer);
            msg.id = data.id;
            msgqueue.push(msg);

        });

        return socket;
    }

    // sendMsgReq: function(id, rawData, xMessage, onAck) {
    //     if (this._socket == null) {
    //         console.log("socket 错误");
    //         return;
    //     }
    //     MsgHandler.getInstance().on(id + 1, onAck);
    //     var buffer = this._protojs.getBuffer(rawData, xMessage);
    //     this._socket.emit("message", {id: id, buffer: buffer});
    // }
});

