"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_protobufjs_1 = require("../server/common/socket_protobufjs");
const socket_protocol_1 = require("../server/common/socket_protocol");
let rawMsg = { account: "chenshao", password: "chb123" };
let netPackage = socket_protobufjs_1.protobufjs.encode(socket_protocol_1.protocol.CL_REGISTER_REQ, rawMsg);
console.log(netPackage);
let mdata = { msgid: socket_protocol_1.protocol.CL_REGISTER_REQ, buffer: netPackage };
let msg = socket_protobufjs_1.protobufjs.decode(mdata);
console.log(msg.account);
console.log(msg.password);