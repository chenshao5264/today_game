import { logger } from '../../utils/logger';
import { protobufjs } from '../common/socket_protobufjs';
import { address2ip } from './../../utils/utility';
import { md5 } from '../../utils/crypto';
import { UserSate } from '../defines/enums';
import { protocol } from './protocol';

import BodyType = require('../defines/bodys');
import dbRedis = require('../../tools/dbRedis');

import commonMsgHandler = require('../game_common/msg_handler');


export let MsgHandler = commonMsgHandler.MsgHandler;

MsgHandler[protocol.P_CG_OP_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
    logger.trace('处理客户端的操作');
}






