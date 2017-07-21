import { address2ip } from './../../utils/utility';
import { ip_port } from './../../config';
import { logger } from './../../utils/logger';
import { SocketDelegate } from '../common/socket_delegate';

import express  = require('express');
import http     = require('http');
import socketio = require('socket.io');
import crypto   = require('../../utils/crypto');

let app    = express();

export class SocketService {
    private _config: ip_port;
    private _delegate: SocketDelegate;
    constructor(config: ip_port, delegate: SocketDelegate) {
        this._config   = config;
        this._delegate = delegate;
    }

    start() {
        let self = this;
        let server = http.createServer(app);
        let io     = socketio(server);

        server.listen(this._config.port);
        logger.info('服务器启动: ' + this._config.port);
        

        io.on('connection', function(socket: SocketIO.Socket) {
            logger.info(address2ip(socket.handshake.address) + '连接服务器');

            socket.on('message', function(data: any) {
                self._delegate.onMessage(socket, data);
            });

            socket.on('disconnect', function(data: any) {
                self._delegate.onDisconnect(socket, data);
            });

            socket.on('error', function(data: any) {
                self._delegate.onError(socket, data);
            });
        })
    }
}