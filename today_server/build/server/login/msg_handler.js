"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_protocol_1 = require("./../common/socket_protocol");
const logger_1 = require("./../../utils/logger");
const socket_protobufjs_1 = require("./../common/socket_protobufjs");
function sendMsgAck(socket, msg) {
    socket.emit('message', msg);
}
exports.handeRegisterReq = function (socket, msg) {
    logger_1.logger.trace("处理注册请求");
    logger_1.logger.info(msg);
    var rawMsg = { errcode: 0 };
    var buffer = socket_protobufjs_1.protobufjs.encode(socket_protocol_1.protocol.LC_REGISTER_ACK, rawMsg);
    let netPackage = { msgid: socket_protocol_1.protocol.LC_REGISTER_ACK, buffer: buffer };
    sendMsgAck(socket, netPackage);
};
