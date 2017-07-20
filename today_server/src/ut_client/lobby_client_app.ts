import io = require('socket.io-client');

import { protobufjs } from '../server/common/socket_protobufjs';
import { protocol } from '../server/common/socket_protocol';
import BodyType = require('../server/defines/bodys')

var opts = {
    'reconnection': false,
    'force new connection': true,
    'transports':['websocket', 'polling']
}

let socket;

let _account;
let _sign;
let _roomid;
let _action;

export let start = function(account, sign, roomid, action) {
    _account = account;
    _sign = sign;
    _roomid = roomid 
    _action = action

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


    
}

 
function login() {
    let packet: BodyType.BaseBody = {msgid: protocol.P_CL_LOBBY_REQ};
    let body: BodyType.LobbyBody = {}

    body.account = _account;
    body.sign   = _sign;

    packet.lobby = body;

    console.log(packet)

    packet = protobufjs.encode(packet);
    socket.emit('message', packet)
}

function createRoom() {
    let packet: BodyType.BaseBody = {msgid: protocol.P_CL_CREATE_ROOM_REQ};
    
    packet = protobufjs.encode(packet);
    socket.emit('message', packet)
}

function enterRoom() {
    let packet: BodyType.BaseBody = {msgid: protocol.P_CL_ENTER_ROOM_REQ};
    let body: BodyType.RoomBody = {};
    body.roomid = 111111;
    console.log(packet)
    packet.room = body;
    packet = protobufjs.encode(packet);
    socket.emit('message', packet)
}

//-- 消息处理
let MSG = {};
MSG[protocol.P_LC_LOBBY_ACK] = function(data: BodyType.BaseBody) {
    console.log(data);
    let body = data.lobby;
    
    if (body.errcode == 0) {
        console.log('lobby 登录成功');
        if (_action == 1) {
            createRoom()
        } else {
            enterRoom()
        }
    } else {
        console.log('errcode = ' + body.errcode);
    }
}

MSG[protocol.P_LC_CREATE_ROOM_ACK] = function(data: BodyType.BaseBody) {
    console.log(data);
    let body = data.room;
    
    if (body.errcode == 0) {
        console.log('create room 成功');
    } else {
        console.log('create room errcode = ' + body.errcode);
    }
}

MSG[protocol.P_LC_ENTER_ROOM_ACK] = function(data: BodyType.BaseBody) {
    console.log(data);
    let body = data.room;

    if (body.errcode == 0) {
        console.log('enter room 成功');
    } else {
        console.log('enter room errcode = ' + body.errcode);
    }
}


MSG[protocol.P_LC_LEAVE_ROOM_NOT] = function(data: BodyType.BaseBody) {
    console.log(data);
    let body = data.room;

    console.log(body.userid +  ' 有人离开房间')
}

MSG[protocol.P_LC_START_GAME_NOT] = function(data: BodyType.BaseBody) {
    console.log(data);
    let body = data.gamestart;

    console.log('游戏开始');
}
