import { protocol } from './../common/socket_protocol';
import { logger } from './../../utils/logger';
import { protobufjs } from './../common/socket_protobufjs';

function sendMsgAck(socket: SocketIO.Socket, msg) {
    socket.emit('message', msg);
}

export let handeRegisterReq = function(socket: SocketIO.Socket, msg) {
    logger.trace("处理注册请求");

    logger.info(msg);

    var rawMsg = {errcode: 0};
    var buffer = protobufjs.encode(protocol.LC_REGISTER_ACK, rawMsg);

    let netPackage = {msgid: protocol.LC_REGISTER_ACK, buffer: buffer};

    sendMsgAck(socket, netPackage);
}