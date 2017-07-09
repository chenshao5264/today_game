"use strict";
cc._RF.push(module, 'dec92+NM4xKX5sv5OCijH0R', 'socket_protobufjs');
// Script/net/socket_protobufjs.js

"use strict";

var protobufjs = require("protobufjs");

var _root = null;

function formatBuffer(buffer) {
    var bufferArray = Object.keys(buffer).map(function (k) {
        console.log(buffer[k]);
        return buffer[k];
    });
    return buffer;
}

cc.Class({
    statics: {
        load: function load() {
            protobufjs.load(cc.url.raw('resources/proto/base.proto'), function (err, root) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("load proto successful!");
                _root = root;
            });
        },
        encode: function encode(payload) {
            var protoMsg = _root.lookupType('base.MessagePkg');
            var errMsg = protoMsg.verify(payload);
            if (errMsg) {
                logger.error(errMsg);
                return [];
            }
            var msg = protoMsg.create(payload);
            var buffer = protoMsg.encode(msg).finish();
            return buffer;
        },
        decode: function decode(buffer) {
            var protoMsg = _root.lookupType('base.MessagePkg');
            console.log(buffer);
            //buffer = formatBuffer(buffer)
            // console.log(buffer);
            var msg = protoMsg.decode(buffer);
            return msg;
        }
    }
});

cc._RF.pop();