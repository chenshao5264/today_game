var logger   = require("../../utils/logger");
var db       = require("../../common/db");
var crypto   = require("../../utils/crypto");
var protocol = require("../../protocol/protocol");

var protobufjs = require("protobufjs");
var protoLogin = protobufjs.loadSync("../../protocol/login.proto");

function getProtoMsg(xMessage) {
    return protoLogin.lookup("todaygame." + xMessage);
}

function getBuffer(rawMsg, protoMsg) {
    var errMsg = protoMsg.verify(rawMsg);
    if (errMsg) {
        logger.error(errMsg)
        return;
    }

    var msg = protoMsg.create(rawMsg);
    var buffer = protoMsg.encode(msg).finish();

    return buffer;
}

function sendMsgAck(socket, id, buffer) {
    socket.emit("message", {id: id, buffer: buffer})
}

// 处理注册请求
exports.handleReigsterReq = function(socket, bufferArray) {
    logger.trace("处理注册请求");

    var protMsg = getProtoMsg("RegisterMessage");

    var msg = protMsg.decode(bufferArray);
    logger.trace(msg);
    

    // 回复
    var rawMsg = {errcode: 0};
    sendMsgAck(socket, protocol.LC_REGISTER_ACK, getBuffer(rawMsg, protMsg));
}

// 处理登陆请求
exports.handleLoginLoginServerReq = function(socket, bufferArray) {
    logger.trace("处理登陆请求");
}

