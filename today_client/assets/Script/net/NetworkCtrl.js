if (!window.io) {
    cc.error('You should import the socket.io.js as a plugin!');
}

cc.Class({
    
});

var socket
exports.makeConnect = function() {
    socket = io.connect("ws://127.0.0.1:9000", {"force new connection" : true});

    socket.on("connect", function(data) {
        console.log("connect connect");
    });

    socket.on("disconnect", function(data) {
        console.log("disconnect disconnect");
    });

    socket.on("message", onMessage);
}

function onMessage(data) {
    console.log(data);

    socket.emit("message", {err:"123123client"})
}
