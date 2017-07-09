"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_protocol_1 = require("./../common/socket_protocol");
const logger_1 = require("./../../utils/logger");
const socket_protobufjs_1 = require("./../common/socket_protobufjs");
function sendMsgAck(socket, packet) {
    packet = socket_protobufjs_1.protobufjs.encode(packet);
    socket.emit('message', packet);
}
function packRegisterMsg(msgid, errcode) {
    let packet = {};
    let body = {};
    packet.msgid = msgid;
    body.errcode = errcode;
    packet.register = body;
    return packet;
}
exports.handeRegisterReq = function (socket, msg) {
    logger_1.logger.trace("处理注册请求");
    let packet = packRegisterMsg(socket_protocol_1.protocol.P_LC_REGISTER_ACK, 0);
    sendMsgAck(socket, packet);
};
