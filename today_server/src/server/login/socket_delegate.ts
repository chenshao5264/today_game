import { protocol } from './../common/socket_protocol';
import { logger } from './../../utils/logger';
import { address2ip } from './../../utils/utility';
import { protobufjs } from './../common/socket_protobufjs';

import msgHandler = require('./msg_handler')

export module socket_delegate {
    export let disconnect = function(socket: SocketIO.Socket, data: any) {
        logger.trace(address2ip(socket.handshake.address) + ' 断开服务器');
    }

    export let error = function (socket: SocketIO.Socket, data: any) {
        logger.warn(address2ip(socket.handshake.address) + ' 发送错误');
    }

    export let message = function (socket: SocketIO.Socket, data: any) {

        let msg = protobufjs.decode(data);

        switch(msg.msgid) {
            case protocol.P_CL_REGISTER_REQ: {
                msgHandler.handeRegisterReq(socket, msg.register);
            }
            case protocol.P_CL_LOGIN_REQ: {

            }

            default: {

            }
        }
    }
}

