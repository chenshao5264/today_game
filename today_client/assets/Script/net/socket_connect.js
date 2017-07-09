
var smsg = require("./socket_msg");

cc.Class({
    ctor: function() {

    },

    closeConnect: function() {
        if (this._socket) {
            this._socket.disconnect();
            this._socket = null;
        }
    },

    makeConnect: function(url, stage) {
        var opts = {
            'reconnection': false,
            'force new connection': true,
            'transports':['websocket', 'polling']
        }

        console.log("connect url: " + url);
        var socket = io.connect(url, opts);

        socket.on("connect", function(data) {
            smsg.onConnected(data, stage);
        });

        socket.on("disconnect", function(data) {
            smsg.onDisconnect(data, stage);
        });

        socket.on("message", function(data) {
            //console.log(data);
            smsg.onMessage(data);
        });

        return socket;
    }
});

