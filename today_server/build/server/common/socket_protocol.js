"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protocol = {
    LOGIN_START: 0,
    CL_REGISTER_REQ: 100,
    LC_REGISTER_ACK: 101,
    CL_LOGIN_REQ: 102,
    LC_LOGIN_ACK: 103,
    LOGIN_END: 500
};
exports.msgid2proto = {
    [exports.protocol.CL_REGISTER_REQ]: 'login.register',
    [exports.protocol.LC_REGISTER_ACK]: 'login.register'
};
