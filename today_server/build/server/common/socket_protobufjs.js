"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protojs = require("protobufjs");
const socket_protocol_1 = require("./socket_protocol");
let protos = {
    'login': '../../../proto/login.proto',
};
let roots = {};
for (let key in protos) {
    roots[key] = protojs.loadSync(protos[key]);
}
function root_msgid(msgid) {
    if (msgid >= socket_protocol_1.protocol.LOGIN_START && msgid < socket_protocol_1.protocol.LOGIN_END) {
        return roots.login;
    }
}
function formatBuffer(buffer) {
    var bufferArray = Object.keys(buffer).map(function (k) {
        return buffer[k];
    });
    return bufferArray;
}
var protobufjs;
(function (protobufjs) {
    protobufjs.encode = function (msgid, rawMsg) {
        let protoMsg = root_msgid(msgid).lookupType(socket_protocol_1.msgid2proto[msgid]);
        var errMsg = protoMsg.verify(rawMsg);
        if (errMsg) {
            console.log(errMsg);
            return [];
        }
        let msg = protoMsg.create(rawMsg);
        let buffer = protoMsg.encode(msg).finish();
        return buffer;
    };
    protobufjs.decode = function (pack) {
        console.log(pack);
        let msgid = pack.msgid;
        let protoMsg = root_msgid(msgid).lookupType(socket_protocol_1.msgid2proto[msgid]);
        let bufferArray = formatBuffer(pack.buffer);
        let msg = protoMsg.decode(bufferArray);
        msg.msgid = msgid;
        return msg;
    };
})(protobufjs = exports.protobufjs || (exports.protobufjs = {}));
