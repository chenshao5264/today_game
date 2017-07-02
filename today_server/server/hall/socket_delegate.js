var logger     = require("../../utils/logger");
var protocol   = require("../../common/protocol");
var msgHandler = require("./msg_handler");

exports.disconnect = function(socket, msgdata) {
    
}

exports.error = function(socket, msgdata) {
    
}

exports.recv = function(socket, msgdata) {
    var eventId = msgdata.eventId;

    switch(msgdata.eventId) {
        case protocol.CS_LOGIN_REQ: {
            msgHandler.handleLoginReq(socket, msgdata.data)
            break;
        }

        default:
    }
}


