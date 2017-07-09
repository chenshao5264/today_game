"use strict";
cc._RF.push(module, '50314el/elFjJCBYemcJPGO', 'protocol');
// Script/net/protocol.js

"use strict";

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

exports.protocol = protocol;

cc._RF.pop();