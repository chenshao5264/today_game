"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_protocol_1 = require("./../common/socket_protocol");
const logger_1 = require("./../../utils/logger");
const utility_1 = require("./../../utils/utility");
const msgHandler = require("./msg_handler");
var socket_delegate;
(function (socket_delegate) {
    socket_delegate.disconnect = function (socket, data) {
        logger_1.logger.info(utility_1.address2ip(socket.handshake.address) + ' 断开服务器');
    };
    socket_delegate.error = function (socket, data) {
        logger_1.logger.warn(utility_1.address2ip(socket.handshake.address) + ' 发送错误');
    };
    socket_delegate.message = function (socket, data) {
        switch (data.msgid) {
            case socket_protocol_1.protocol.CL_REGISTER_REQ: {
                msgHandler.handeRegisterReq(socket, data.register);
            }
        }
    };
})(socket_delegate = exports.socket_delegate || (exports.socket_delegate = {}));
