var logger   = require("../../utils/logger");
var db       = require("../../common/db");
var crypto   = require("../../utils/crypto");
var protocol = require("../common/protocol").protocol;
var protobufjs = require("../common/socket_protobufjs");

function sendMsgAck(socket, msgid, buffer) {
    socket.emit("message", {id: msgid, buffer: buffer})
}

// 处理注册请求
exports.handleReigsterReq = function(socket, msg) {
    logger.trace("处理注册请求");

    logger.info(msg);
    

    // 回复
    var rawMsg = {errcode: 0};
    var buffer = protobufjs.encode(protocol.LC_REGISTER_ACK, rawMsg);
    sendMsgAck(socket, protocol.LC_REGISTER_ACK, buffer);
}

// 处理登陆请求
exports.handleLoginLoginServerReq = function(socket, msg) {
    logger.trace("处理登陆请求");
}

