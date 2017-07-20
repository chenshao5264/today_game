import { logger } from './../../utils/logger';

import { SocketDelegate } from '../common/socket_delegate';
import { SocketService } from './../common/socket_service';
import { MsgHandler } from './msg_handler';
import { ipConfig } from './config';
import { mysql_config } from './../config';

import dbMysql = require('../../tools/dbMysql');
import dbRedis = require('../../tools/dbRedis');

let ret = dbMysql.init(mysql_config());
if (ret) {
    logger.trace('数据库初始化成功');
} else {
    logger.error('数据库初始化失败');
}

// 启动redis
let client = dbRedis.run();
//client.flushall();

let socket_delegate = new SocketDelegate(MsgHandler);
let socketService = new SocketService(ipConfig, socket_delegate);
socketService.start();
logger.info('服务器启动: ' + ipConfig.port);