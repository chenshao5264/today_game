"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protojs = require("protobufjs");
let root = protojs.loadSync('../../proto/base.proto');
let pack = {};
pack.msgid = 100;
let register = {};
register.account1 = "chenshao";
register.password = "chb123";
register.nickname = "辰少01";
pack.register = register;
let protoMsg = root.lookupType('base.MessagePkg');
var errMsg = protoMsg.verify(pack);
if (errMsg) {
    console.log(errMsg);
    return;
}
console.log(pack);
let msg = protoMsg.create(pack);
let buffer = protoMsg.encode(msg).finish();
console.log(buffer);
protoMsg = root.lookupType('base.MessagePkg');
pack = protoMsg.decode(buffer);
console.log(pack);
