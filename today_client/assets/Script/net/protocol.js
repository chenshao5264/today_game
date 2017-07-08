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
}

var msgid2proto = {
    [protocol.CL_REGISTER_REQ]: "login.register",
    [protocol.LC_REGISTER_ACK]: "login.register"
}


exports.protocol    = protocol
exports.msgid2proto = msgid2proto
