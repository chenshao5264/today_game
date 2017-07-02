var app    = require("express")();
var server = require("http").Server(app);
var io     = require("socket.io")(server);

server.listen(9000);


io.on('connection', function(socket) {
    socket.emit('message', {errcode: 1, errmsg: "server send msg"});

    socket.on("message", function(data) {
        console.log(data);
    });

    socket.on("disconnect", function(data) {
        console.log("disconnect");
    });

    socket.on('error', function(data) {
        console.log("error");
    });
});

console.log("listen:9100");
