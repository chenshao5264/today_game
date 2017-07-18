import { logger } from './../../utils/logger';

import { SocketDelegate } from '../common/socket_delegate';
import { SocketService } from './../common/socket_service';

import dbMysql = require('../../tools/dbMysql');
import dbRedis = require('../../tools/dbRedis');

import { MsgHandler } from '../login/msg_handler';
import { login_server, mysql } from './../../config';

let ret = dbMysql.init(mysql());
if (ret) {
    logger.trace('数据库初始化成功');
} else {
    logger.error('数据库初始化失败');
}

// 启动redis
let client = dbRedis.run();
client.flushall();

let loginConfig = login_server();
let socket_delegate = new SocketDelegate(MsgHandler);
let socketService = new SocketService(loginConfig, socket_delegate);
socketService.start();
logger.info('login 服务器启动: ' + loginConfig.port);
