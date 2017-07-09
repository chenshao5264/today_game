import { error } from './socket_delegate';
import { protocol, MsgPacket } from './../common/socket_protocol';
import { logger } from './../../utils/logger';
import { protobufjs } from './../common/socket_protobufjs';

function sendMsgAck(socket: SocketIO.Socket, packet) {
    packet = protobufjs.encode(packet);
    socket.emit('message', packet);
}

function packRegisterMsg(msgid: number, body: any) {

    let packet: MsgPacket = {};
    packet.msgid    = msgid;
    packet.register = body;

    return packet;
}

export let handeRegisterReq = function(socket: SocketIO.Socket, msg) {
    logger.trace("处理注册请求");

    let ret = 0;

    // todo

    //

    let packet = packRegisterMsg(protocol.P_LC_REGISTER_ACK, {errcode: ret})
    sendMsgAck(socket, packet);
}