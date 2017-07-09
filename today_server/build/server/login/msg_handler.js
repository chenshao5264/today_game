"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_protocol_1 = require("./../common/socket_protocol");
const logger_1 = require("./../../utils/logger");
const socket_protobufjs_1 = require("./../common/socket_protobufjs");
function sendMsgAck(socket, packet) {
    console.log(packet);
    socket.emit('message', packet);
}
exports.handeRegisterReq = function (socket, msg) {
    logger_1.logger.trace("处理注册请求111");
    logger_1.logger.info(msg);
    let packet = {};
    packet.msgid = socket_protocol_1.protocol.LC_REGISTER_ACK;
    let body = {};
    body.errcode = 0;
    packet.register = body;
    packet = socket_protobufjs_1.protobufjs.encode(packet);
    sendMsgAck(socket, packet);
};
