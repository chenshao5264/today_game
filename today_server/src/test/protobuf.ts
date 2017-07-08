import { NetPackage } from './../server/common/socket_protocol';
import {protobufjs} from '../server/common/socket_protobufjs';
import {protocol} from '../server/common/socket_protocol';

let rawMsg = {account: "chenshao", password: "chb123"}

let netPackage = protobufjs.encode(protocol.CL_REGISTER_REQ, rawMsg);
console.log(netPackage);
    
let mdata: NetPackage = {msgid: protocol.CL_REGISTER_REQ, buffer: netPackage};

let msg = protobufjs.decode(mdata);
console.log(msg.account);
console.log(msg.password);
