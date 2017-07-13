import { protocol } from '../common/socket_protocol';
import { logger } from '../../utils/logger';
import { protobufjs } from '../common/socket_protobufjs';
import { address2ip } from './../../utils/utility';
import { md5 } from "../../utils/crypto";

import BodyType = require('../common/define_body');
import db = require('../../tools/db');

function sendMsgAck(socket: SocketIO.Socket, packet) {
    if (socket.connected) {
        packet = protobufjs.encode(packet);
        socket.emit('message', packet);
    } else {
        logger.trace(address2ip(socket.handshake.address) + ' socket 已断开');
    }
}

export let MsgHandler = {};
MsgHandler[protocol.P_CL_LOGIN_LOBBY_REQ] = function(socket: SocketIO.Socket, msg: BodyType.MsgPacket) {
    logger.trace("处理登录请求");
    
}

