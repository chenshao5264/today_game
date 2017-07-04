"use strict";
cc._RF.push(module, '50314el/elFjJCBYemcJPGO', 'protocol');
// Script/net/protocol.js

"use strict";

var _msgid2proto;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var protocol = {
    // login
    LOGIN_START: 100,
    CL_REGISTER_REQ: 100,
    LC_REGISTER_ACK: 101,
    CL_LOGIN_REQ: 102,
    LC_LOGIN_ACK: 103,
    LOGIN_END: 500,
    //
    CS_LOGIN_REQ: 500,
    SC_LOGIN_ACK: 501
};

var msgid2proto = (_msgid2proto = {}, _defineProperty(_msgid2proto, protocol.CL_REGISTER_REQ, "login.register"), _defineProperty(_msgid2proto, protocol.LC_REGISTER_ACK, "login.register"), _msgid2proto);

exports.protocol = protocol;
exports.msgid2proto = msgid2proto;

cc._RF.pop();