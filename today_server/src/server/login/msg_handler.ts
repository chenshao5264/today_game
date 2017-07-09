import { protocol } from '../common/socket_protocol';
import { logger } from '../../utils/logger';
import { protobufjs } from '../common/socket_protobufjs';
import { address2ip } from './../../utils/utility';

import BodyType = require('../common/socket_body')

function sendMsgAck(socket: SocketIO.Socket, packet) {
    if (socket.connected) {
        packet = protobufjs.encode(packet);
        socket.emit('message', packet);
    } else {
        logger.trace(address2ip(socket.handshake.address) + ' socket 已断开');
    }
}

function packRegisterMsg(msgid: number, body: BodyType.ReigsterBody) {

    let packet: BodyType.MsgPacket = {msgid: msgid};
    packet.register = body;

    return packet;
}

export let handeRegisterReq = function(socket: SocketIO.Socket, msg: BodyType.ReigsterBody) {
    logger.trace("处理注册请求");

    let ret = 0;

    // todo

    //

    let packet = packRegisterMsg(protocol.P_LC_REGISTER_ACK, {errcode: ret})
    sendMsgAck(socket, packet);    
}

export let handeLoginReq = function(socket: SocketIO.Socket, msg) {

}