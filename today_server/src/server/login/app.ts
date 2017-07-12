import { login_server, mysql } from './../../config';
import { SocketService } from './../common/socket_service';
import { socket_delegate } from './socket_delegate';
import { logger } from './../../utils/logger';

import db = require('../../tools/db');
let ret = db.init(mysql());
if (ret) {
    logger.info('数据库初始化成功');
} else {
    logger.info('数据库初始化失败');
}


let loginConfig = login_server();
let socketService = new SocketService(loginConfig, socket_delegate);
socketService.start();
logger.info('服务器启动: ' + loginConfig.port);
