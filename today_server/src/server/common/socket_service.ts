import { NetPackage } from './socket_protocol';
import { address2ip } from './../../utils/utility';
import { ip_port } from './../../config';
import { logger } from './../../utils/logger';
import { protobufjs } from './../common/socket_protobufjs';

import express  = require('express');
import http     = require('http');
import socketio = require('socket.io');
import crypto   = require('../../utils/crypto');

let app    = express();
let server = http.createServer(app);
let io     = socketio(server);

export interface SocketDelegate {
    disconnect: (socket: SocketIO.Socket, msgData: any) => void,
    error: (socket: SocketIO.Socket, msgData: any) => void,
    message: (socket: SocketIO.Socket, msgData: any) => void,
}

export module socket_service {
    export let start = function(config: ip_port, delegate: SocketDelegate) {
        server.listen(config.port);
        logger.info('服务器启动: ' + config.port);

        io.on('connection', function(socket: SocketIO.Socket) {
            logger.info(address2ip(socket.handshake.address) + '连接服务器');

            socket.on('message', function(data: any) {
                let msg = protobufjs.decode(data);
                delegate.message(socket, msg);
            });

            socket.on('disconnect', function(data: any) {
                logger.info('ocket disconnect: ' + data);
                delegate.disconnect(socket, data);
            });

            socket.on('error', function(data: any) {
                logger.warn('socket error: ' + data);
                delegate.error(socket, data);
            });
        })
    }
}