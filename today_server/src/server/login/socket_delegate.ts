import { protocol } from './../common/socket_protocol';
import { logger } from './../../utils/logger';
import { address2ip } from './../../utils/utility';

import msgHandler = require('./msg_handler')

export module socket_delegate {
    export let disconnect = function(socket: SocketIO.Socket, data: any) {
        logger.info(address2ip(socket.handshake.address) + ' 断开服务器');
    }

    export let error = function (socket: SocketIO.Socket, data: any) {
        logger.warn(address2ip(socket.handshake.address) + ' 发送错误');
    }

    export let message = function (socket: SocketIO.Socket, data: any) {
        switch(data.msgid) {
            case protocol.P_CL_REGISTER_REQ: {
                msgHandler.handeRegisterReq(socket, data.register);
            }

            default: {
                
            }
        }
    }
}

