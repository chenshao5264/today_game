var logger     = require("../../utils/logger");
var protocol   = require("../../protocol/protocol");
var msgHandler = require("./msg_handler");



exports.disconnect = function(socket, msgdata) {
    
}

exports.error = function(socket, msgdata) {
    
}




exports.recv = function(socket, msgdata) {
    console.log("msgdata: " + msgdata);
    var buffer = msgdata.buffer;
    var bufferArray = Object.keys(buffer).map(function(k) {
        return buffer[k];
    });
    

    switch(msgdata.id) {
        case protocol.CL_REGISTER_REQ: {
            msgHandler.handleReigsterReq(socket, bufferArray)
            break;
        }
        case protocol.CL_LOGIN_REQ: {
            msgHandler.handleLoginLoginServerReq(socket, bufferArray)
            break;
        }
        

        default: {

        }
    }
}


