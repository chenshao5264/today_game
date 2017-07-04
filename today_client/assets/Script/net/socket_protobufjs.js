var protobufjs = require("protobufjs");
var msgid2proto = require("./protocol").msgid2proto;

var protos = {
    "login": "resources/proto/login.proto"
}

var roots = {}

function root_msgid(msgid) {
    if (msgid >= 100 && msgid < 500) {
        return roots.login;
    } else {

    }
} 

cc.Class({
    statics: {
        load: function() {
            for (var key in protos) {
                protobufjs.load(cc.url.raw(protos[key]), function(err, root) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    roots[key] = root;
                }) 
            }
        },
        encode: function(msgid, rawMsg) {
            var protoMsg = root_msgid(msgid).lookupType(msgid2proto[msgid]);

            var errMsg = protoMsg.verify(rawMsg);
            if (errMsg) {
                console.log(errMsg);
                return [];
            }

            var msg = protoMsg.create(rawMsg);
            var buffer = protoMsg.encode(msg).finish();

            return buffer;
        },
        decode: function(msgid, bufferArray) {
            var protoMsg = root_msgid(msgid).lookupType(msgid2proto[msgid]);
            var msg = protoMsg.decode(bufferArray);
            return msg;
        }
    }
});
