import { protocol } from './../common/socket_protocol';
import { logger } from './../../utils/logger';
import { protobufjs } from './../common/socket_protobufjs';

function sendMsgAck(socket: SocketIO.Socket, packet) {
    
    console.log(packet);
    socket.emit('message', packet);
}

export let handeRegisterReq = function(socket: SocketIO.Socket, msg) {
    logger.trace("处理注册请求111");

    logger.info(msg);

    let packet: any = {};
    packet.msgid = protocol.LC_REGISTER_ACK;

    let body: any = {};
    body.errcode = 0;

    packet.register = body;

    packet = protobufjs.encode(packet);
    sendMsgAck(socket, packet);

}