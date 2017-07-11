import protojs = require('protobufjs');
import { logger } from './../../utils/logger';

let root = protojs.loadSync('../../../proto/base.proto');

function formatBuffer(buffer) {
    var bufferArray = Object.keys(buffer).map(function(k) {
        return buffer[k];
    })
    return bufferArray
}

export module protobufjs {
    export let encode = function(payload: any) {

        let protoMsg = root.lookupType('base.MessagePkg');
        var errMsg = protoMsg.verify(payload);
        if (errMsg) {
            logger.error(errMsg);
            return [];
        }

        let msg    = protoMsg.create(payload);
        let buffer = protoMsg.encode(msg).finish();

        return buffer;
    }

    export let decode = function(buffer: any) {
        let protoMsg = root.lookupType('base.MessagePkg');
        buffer = formatBuffer(buffer);
        let msg      = protoMsg.decode(buffer);
        return msg;
    }
}
