"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("./../../utils/utility");
const logger_1 = require("./../../utils/logger");
const socket_protobufjs_1 = require("./../common/socket_protobufjs");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
let app = express();
let server = http.createServer(app);
let io = socketio(server);
var socket_service;
(function (socket_service) {
    socket_service.start = function (config, delegate) {
        server.listen(config.port);
        logger_1.logger.info('服务器启动: ' + config.port);
        io.on('connection', function (socket) {
            logger_1.logger.info(utility_1.address2ip(socket.handshake.address) + '连接服务器');
            socket.on('message', function (data) {
                let msg = socket_protobufjs_1.protobufjs.decode(data);
                delegate.message(socket, msg);
            });
            socket.on('disconnect', function (data) {
                logger_1.logger.info('ocket disconnect: ' + data);
                delegate.disconnect(socket, data);
            });
            socket.on('error', function (data) {
                logger_1.logger.warn('socket error: ' + data);
                delegate.error(socket, data);
            });
        });
    };
})(socket_service = exports.socket_service || (exports.socket_service = {}));
