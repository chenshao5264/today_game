"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("./../../utils/utility");
const logger_1 = require("./../../utils/logger");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
let app = express();
class SocketService {
    constructor(config, delegate) {
        this._config = config;
        this._delegate = delegate;
    }
    start() {
        let self = this;
        let server = http.createServer(app);
        let io = socketio(server);
        server.listen(this._config.port);
        logger_1.logger.info('服务器启动: ' + this._config.port);
        io.on('connection', function (socket) {
            logger_1.logger.info(utility_1.address2ip(socket.handshake.address) + '连接服务器');
            socket.on('message', function (data) {
                self._delegate.message(socket, data);
            });
            socket.on('disconnect', function (data) {
                logger_1.logger.info('ocket disconnect: ' + data);
                self._delegate.disconnect(socket, data);
            });
            socket.on('error', function (data) {
                logger_1.logger.warn('socket error: ' + data);
                self._delegate.error(socket, data);
            });
        });
    }
}
exports.SocketService = SocketService;
// export module socket_service {
//     export let start = function(config: ip_port, delegate: SocketDelegate) {
//         let app    = express();
//         let server = http.createServer(app);
//         let io     = socketio(server);
//         server.listen(config.port);
//         logger.info('服务器启动: ' + config.port);
//         io.on('connection', function(socket: SocketIO.Socket) {
//             logger.info(address2ip(socket.handshake.address) + '连接服务器');
//             socket.on('message', function(data: any) {
//                 delegate.message(socket, data);
//             });
//             socket.on('disconnect', function(data: any) {
//                 logger.info('ocket disconnect: ' + data);
//                 delegate.disconnect(socket, data);
//             });
//             socket.on('error', function(data: any) {
//                 logger.warn('socket error: ' + data);
//                 delegate.error(socket, data);
//             });
//         })
//     }
// } 
