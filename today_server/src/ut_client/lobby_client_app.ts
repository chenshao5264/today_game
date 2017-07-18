import io = require('socket.io-client');

import { protobufjs } from '../server/common/socket_protobufjs';
import { protocol } from '../server/common/socket_protocol';
import BodyType = require('../server/common/define_body')

var opts = {
    'reconnection': false,
    'force new connection': true,
    'transports':['websocket', 'polling']
}

let socket;

let _userid;
let _sign;

export let start = function(userid, sign) {
    socket = io.connect('ws://127.0.0.1:9200', opts);

    socket.on("disconnect", function(data) {
        console.log('disconnect disconnect disconnect');
    });

    socket.on('connect', function() {
        console.log('connect connect connect');

        login();
    })

    socket.on('message', function(data) {
        let msg = protobufjs.decode(data);
        MSG[msg.msgid](msg);
    })

    _userid = userid;
    _sign = sign;
}

 
function login() {
    let packet: BodyType.MsgPacket = {msgid: protocol.P_CL_LOBBY_REQ};
    let body: BodyType.LobbyBody = {}

    body.userid = _userid;
    body.sign   = _sign;

    packet.lobby = body;


    packet = protobufjs.encode(packet);
    socket.emit('message', packet)
}

function createRoom() {
    let packet: BodyType.MsgPacket = {msgid: protocol.P_CL_CREATE_ROOM_REQ};
    
    packet = protobufjs.encode(packet);
    socket.emit('message', packet)
}

//-- 消息处理
let MSG = {};
MSG[protocol.P_LC_LOBBY_ACK] = function(data: BodyType.MsgPacket) {
    console.log(data);
    let body = data.lobby;
    
    if (body.errcode == 0) {
        console.log('lobby 登录成功');

        createRoom()
    } else {
        console.log('errcode = ' + body.errcode);
    }
}

MSG[protocol.P_LC_CREATE_ROOM_ACK] = function(data: BodyType.MsgPacket) {
    console.log(data);
    let body = data.room;
    
    if (body.errcode == 0) {
        console.log('create room 成功');

    } else {
        console.log('errcode = ' + body.errcode);
    }
}

