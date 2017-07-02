var app    = require("express")();
var server = require("http").Server(app);
var io     = require("socket.io")(server);

var crypto = require("../../utils/crypto");
var logger = require("../../utils/logger");

exports.start = function(config, delegate) {

    server.listen(config.client_port);
    logger.info("服务器启动: " + config.client_port)

    io.on('connection', function(socket) {

        var address = socket.handshake.address; 
        if(address.indexOf("::ffff:") != -1){
            address = address.substr(7);
        }
        logger.info(address + " 连接服务器");

        socket.on("message", function(data) {
            delegate.recv(socket, data);
        });

        socket.on("disconnect", function(data) {
            logger.info("socket disconnect: " + data);
            delegate.disconnect(socket, data);
        });

        socket.on("error", function(data) {
            logger.warn("socket error: " + data);
            delegate.error(socket, data);
        });
    });
}