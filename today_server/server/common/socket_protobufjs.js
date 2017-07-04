var protobufjs = require("protobufjs");
var msgid2proto = require("./protocol").msgid2proto;

var protos = {
    "login": "../../proto/login.proto"
}

var roots = {}

for (var key in protos) {
    roots[key] = protobufjs.loadSync(protos[key]);
}

function root_msgid(msgid) {
    if (msgid >= 100 && msgid < 500) {
        return roots.login;
    } else {

    }
}


exports.encode = function(msgid, rawMsg) {
    var protoMsg = root_msgid(msgid).lookupType(msgid2proto[msgid]);

    var errMsg = protoMsg.verify(rawMsg);
    if (errMsg) {
        console.log(errMsg);
        return [];
    }

    var msg = protoMsg.create(rawMsg);
    var buffer = protoMsg.encode(msg).finish();

    return buffer;
}

exports.decode = function(msgid, bufferArray) {
    var protoMsg = root_msgid(msgid).lookupType(msgid2proto[msgid]);
    var msg = protoMsg.decode(bufferArray);
    return msg;
}

