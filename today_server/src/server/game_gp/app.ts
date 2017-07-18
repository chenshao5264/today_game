import { logger } from './../../utils/logger';

import { SocketDelegate } from '../common/socket_delegate';
import { SocketService } from './../common/socket_service';

import dbMysql = require('../../tools/dbMysql');
import dbRedis = require('../../tools/dbRedis');

import { MsgHandler } from '../lobby/msg_handler';
import { mysql } from './../../config';
import { gpConcig } from './config';

let ret = dbMysql.init(mysql());
if (ret) {
    logger.trace('数据库初始化成功');
} else {
    logger.error('数据库初始化失败');
}

// 启动redis
let client = dbRedis.run();

let socket_delegate = new SocketDelegate(MsgHandler);
let socketService = new SocketService(gpConcig, socket_delegate);
socketService.start();
logger.info('game 服务器启动: ' + gpConcig.port);
