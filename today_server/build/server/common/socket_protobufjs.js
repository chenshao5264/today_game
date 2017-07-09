"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protojs = require("protobufjs");
const logger_1 = require("./../../utils/logger");
let root = protojs.loadSync('../../../proto/base.proto');
function formatBuffer(buffer) {
    var bufferArray = Object.keys(buffer).map(function (k) {
        return buffer[k];
    });
    return bufferArray;
}
var protobufjs;
(function (protobufjs) {
    protobufjs.encode = function (payload) {
        let protoMsg = root.lookupType('base.MessagePkg');
        var errMsg = protoMsg.verify(payload);
        if (errMsg) {
            logger_1.logger.error(errMsg);
            return [];
        }
        let msg = protoMsg.create(payload);
        let buffer = protoMsg.encode(msg).finish();
        return buffer;
    };
    protobufjs.decode = function (buffer) {
        let protoMsg = root.lookupType('base.MessagePkg');
        let msg = protoMsg.decode(formatBuffer(buffer));
        return msg;
    };
})(protobufjs = exports.protobufjs || (exports.protobufjs = {}));
