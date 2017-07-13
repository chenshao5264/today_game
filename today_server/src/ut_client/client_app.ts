import io = require('socket.io-client');

import { protobufjs } from '../server/common/socket_protobufjs';
import { protocol } from '../server/common/socket_protocol';
import BodyType = require('../server/common/define_body')

var opts = {
    'reconnection': false,
    'force new connection': true,
    'transports':['websocket', 'polling']
}

 let socket = io.connect('ws://127.0.0.1:9100', opts);
 
function register() {
    let packet: BodyType.MsgPacket = { msgid: protocol.P_CL_REGISTER_REQ };
    
    let body: BodyType.ReigsterBody = {};
    body.account = 'chenshao08';
    body.nickname = '辰少01';
    body.password = 'chb123';
    packet.register = body;

    packet = protobufjs.encode(packet);

    socket.emit('message', packet)
}

socket.on("disconnect", function(data) {
    console.log('disconnect disconnect disconnect');
});

 socket.on('connect', function() {
     console.log('connect connect connect');
     register();
 })

 socket.on('message', function(data) {
     let msg = protobufjs.decode(data);
     MSG[msg.msgid](msg);
 })

//-- 消息处理
let MSG = {};
MSG[protocol.P_LC_REGISTER_ACK] = function(data) {
    let body = data.register;
    console.log(body);
    if (body.errcode == 0) {
        console.log('注册成功');
    } else {
        console.log('errcode = ' + body.errcode);
    }
}

