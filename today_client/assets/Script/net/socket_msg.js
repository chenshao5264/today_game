
var sockets = {};

cc.Class({
    statics: {
        setSocket(stage, socket): {
            sockets[stage] = socket;
        },
        onConnected: function(data, stage) {
            console.log("connect connect");
        },
        onDisconnect: function(data, stage) {
            console.log("disconnect disconnect");
        },
        onMessage: function(data) {
            console.log(data);
        },
        send: function(msgid, rawData) {
            var stage = "";
            if (msgid >= 100 && msgid < 500) {
                stage = "login"
            }


        }
    }
});