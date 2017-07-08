import protojs = require('protobufjs');

import { protocol, msgid2proto, NetPackage} from './socket_protocol';

let protos: {[key: string]: string} = {
    'login': '../../../proto/login.proto',
}

let roots: {[key: string]: string } = {}

for (let key in protos) {
    roots[key] = protojs.loadSync(protos[key]);
}

function root_msgid(msgid: number): string {
    if (msgid >= protocol.LOGIN_START && msgid < protocol.LOGIN_END) {
        return roots.login;
    }
}

function formatBuffer(buffer) {
    var bufferArray = Object.keys(buffer).map(function(k) {
        return buffer[k];
    })
    return bufferArray
}

export module protobufjs {
    export let encode = function(msgid: number, rawMsg: any) {

        let protoMsg = root_msgid(msgid).lookupType(msgid2proto[msgid]);
        var errMsg = protoMsg.verify(rawMsg);
        if (errMsg) {
            console.log(errMsg);
            return [];
        }

        let msg        = protoMsg.create(rawMsg);
        let buffer = protoMsg.encode(msg).finish();


        return buffer;
    }

    export let decode = function(pack: NetPackage) {
        console.log(pack)
        let msgid       = pack.msgid;
        let protoMsg    = root_msgid(msgid).lookupType(msgid2proto[msgid]);
        let bufferArray = formatBuffer(pack.buffer)
        let msg         = protoMsg.decode(bufferArray);
        msg.msgid = msgid
        return msg;
    }
}
