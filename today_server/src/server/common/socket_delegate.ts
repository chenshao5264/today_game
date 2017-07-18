import { protocol } from './../common/socket_protocol';
import { logger } from './../../utils/logger';
import { address2ip } from './../../utils/utility';
import { protobufjs } from './../common/socket_protobufjs';
import { UserSate } from '../common/define_body';

import BodyType = require('../common/define_body');
import dbRedis = require('../../tools/dbRedis');

export class SocketDelegate {

    private _msgHandler: any = {};
    public constructor(msgHandler: any) {
        this._msgHandler = msgHandler;
    }

    public onDisconnect(socket: BodyType.SocketIO_Socket, data: any) {
        logger.trace(address2ip(socket.handshake.address) + ' ' + socket.userid + ' 断开服务器');
        dbRedis.hmset('userid:' + socket.userid, {'state': UserSate.STATE_NULL});

        if (this._msgHandler['ON_DISCONNECT']) {
            this._msgHandler['ON_DISCONNECT'](socket.userid);
        }
    }

    public onError(socket: BodyType.SocketIO_Socket, data: any) {
        logger.warn(address2ip(socket.handshake.address) + ' ' + socket.userid + ' 发生错误' + data);
        dbRedis.hmset('userid:' + socket.userid, {'state': UserSate.STATE_NULL});

        if (this._msgHandler['ON_DISCONNECT']) {
            this._msgHandler['ON_DISCONNECT'](socket.userid);
        }
    }

    public onMessage = function (socket: BodyType.SocketIO_Socket, data: any) {
        let msg = protobufjs.decode(data);
        if (this._msgHandler[msg.msgid]) {
            this._msgHandler[msg.msgid](socket, msg);
        } else {
            logger.warn(msg.msgid + ' 未定义');
            socket.disconnect();
        }
    }
}