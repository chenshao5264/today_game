var protobufjs = require("protobufjs");

let _root = null;

function formatBuffer(buffer) {
    let bufferArray = Object.keys(buffer).map(function(k) {
        console.log(buffer[k]);
        return buffer[k];
    })
    return buffer
}

cc.Class({
    statics: {
        load: function() {
            protobufjs.load(cc.url.raw('resources/proto/base.proto'), function(err, root) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("load proto successful!");
                _root = root;
            }) 
        },
        encode: function(payload) {
            let protoMsg = _root.lookupType('base.MessagePkg');
            let errMsg   = protoMsg.verify(payload);
            if (errMsg) {
                logger.error(errMsg);
                return [];
            }
            let msg    = protoMsg.create(payload);
            let buffer = protoMsg.encode(msg).finish();
            return buffer;
        },
        decode: function(buffer) {
            let protoMsg = _root.lookupType('base.MessagePkg');
            console.log(buffer);
            //buffer = formatBuffer(buffer)
           // console.log(buffer);
            let msg      = protoMsg.decode(buffer);
            return msg;
        }
    }
});
