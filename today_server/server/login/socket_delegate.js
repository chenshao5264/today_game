var logger     = require("../../utils/logger");
var protocol   = require("../common/protocol").protocol;
var msgHandler = require("./msg_handler");
var protobufjs = require("../common/socket_protobufjs");


exports.disconnect = function(socket, msgdata) {
    var address = socket.handshake.address; 
    if(address.indexOf("::ffff:") != -1){
        address = address.substr(7);
    }
    logger.info(address + " 断开服务器");
}

exports.error = function(socket, msgdata) {
    
}

exports.recv = function(socket, msgdata) {

    // start 适配
    var buffer = msgdata.buffer;
    var bufferArray = Object.keys(buffer).map(function(k) {
        return buffer[k];
    });
    var msgid = msgdata.id
    var msg   = protobufjs.decode(msgid, bufferArray);
    // end 适配

    switch(msgid) {
        case protocol.CL_REGISTER_REQ: {
            msgHandler.handleReigsterReq(socket, msg);
            break;
        }
        case protocol.CL_LOGIN_REQ: {
            msgHandler.handleLoginLoginServerReq(socket, msg);
            break;
        }
        

        default: {

        }
    }
}


