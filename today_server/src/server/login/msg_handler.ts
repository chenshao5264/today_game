import { protocol } from './../common/socket_protocol';
import { logger } from './../../utils/logger';
import { protobufjs } from './../common/socket_protobufjs';

function sendMsgAck(socket: SocketIO.Socket, packet) {
    packet = protobufjs.encode(packet);
    socket.emit('message', packet);
}

function packRegisterMsg(msgid: number, errcode: number) {
    let packet: any = {};
    let body:   any = {};

    packet.msgid    = msgid;
    body.errcode    = errcode;
    packet.register = body;

    return packet;
}

export let handeRegisterReq = function(socket: SocketIO.Socket, msg) {
    logger.trace("处理注册请求");

    
    let packet = packRegisterMsg(protocol.P_LC_REGISTER_ACK, 0)

    sendMsgAck(socket, packet);

}