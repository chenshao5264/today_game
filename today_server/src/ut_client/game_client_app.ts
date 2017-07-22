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

let _userid;

export let start = function(userid, account, sign, action) {
    _userid = userid;
    _account = account;
    _sign = sign;
    _action = action;

    socket = io.connect('ws://127.0.0.1:9300', opts);

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

function createRoom() {
    let packet: BodyType.BaseBody = {msgid: protocol.P_CG_CREATE_ROOM_REQ};
    let clientData: BodyType.RoomBody = {};
    clientData.userid = _userid;

    console.log(clientData);
    packet.room = clientData;

    packet = protobufjs.encode(packet);
    socket.emit('message', packet)
}

 
function login() {
    let packet: BodyType.BaseBody = {msgid: protocol.P_CG_LOGIN_REQ};
    let body: BodyType.GameLoginBody = {}

    body.userid = _userid;
    body.account = _account;
    body.sign   = _sign;

    packet.gamelogin = body;

    packet = protobufjs.encode(packet);
    socket.emit('message', packet);
}

// 请求离开房间
function reqLeaveRoom() {
    console.log('请求离开房间');
    let packet: BodyType.BaseBody = {msgid: protocol.P_CG_LEAVE_ROOM_REQ};
    let body: BodyType.RoomBody = {}

    body.userid = _userid;
    packet.room = body;

    packet = protobufjs.encode(packet);
    socket.emit('message', packet);
}

function enterRoom() {
    let packet: BodyType.BaseBody = {msgid: protocol.P_CG_ENTER_ROOM_REQ};
    let body: BodyType.RoomBody = {};
    body.roomid = 111111;
    body.userid = _userid;
    console.log(packet)
    packet.room = body;
    packet = protobufjs.encode(packet);
    socket.emit('message', packet)
}

function reqHandUp() {
    let packet: BodyType.BaseBody = {msgid: protocol.P_CG_HAND_UP_REQ};
    let body: BodyType.HandUpBody = {}
    body.userid = _userid;
    packet.handup = body;

    packet = protobufjs.encode(packet);
    socket.emit('message', packet)
}

//-- 消息处理
let MSG = {};
MSG[protocol.P_GC_LOGIN_ACK] = function(data: BodyType.BaseBody) {
    console.log(data);
    let body = data.gamelogin;


    if (body.errcode == 0) {
        console.log('game 登录成功');
        if (_action == 1) {
            createRoom();
        } else {
            enterRoom();
        }
        
    } else {
        console.log('errcode = ' + body.errcode);
    }
}

MSG[protocol.P_GC_CREATE_ROOM_ACK] = function(data: BodyType.BaseBody) {
    console.log(data);
    let body = data.room;
    
    if (body.errcode == 0) {
        console.log('create room 成功');
        setTimeout(function() {
            reqHandUp();
        }, 3000)
    } else {
        console.log('create room errcode = ' + body.errcode);
    }
}

MSG[protocol.P_GC_ENTER_ROOM_ACK] = function(data: BodyType.BaseBody) {
    console.log(data);
    let body = data.room;

    if (body.errcode == 0) {
        console.log('enter room 成功');

        setTimeout(function() {
            reqHandUp();
        }, 1000)
    } else {
        console.log('enter room errcode = ' + body.errcode);
    }
}

MSG[protocol.P_GC_LEAVE_ROOM_NOT] = function(data: BodyType.BaseBody) {
    console.log(data);
    let body = data.room;

    console.log(body.userid +  ' 有人离开房间通知')
}

MSG[protocol.P_GC_LEAVE_ROOM_ACK] = function(data: BodyType.BaseBody) {
    console.log(data);
    let body = data.room;
    if (body.errcode == 0) {
        console.log('成功离开房间回复');
    } else {
        console.log('leave room errcode = ' + body.errcode);
    }
}

MSG[protocol.P_GC_DISSOLVE_ROOM_NOT] = function(data: BodyType.BaseBody) {
    console.log(data);
    let body = data.room;
    
    console.log('房间解散');
}

MSG[protocol.P_GC_HAND_UP_ACK] = function(data: BodyType.BaseBody) {
    console.log('举手回复');
    console.log(data);
}

MSG[protocol.P_GC_HAND_UP_NOT] = function(data: BodyType.BaseBody) {
    console.log('举手通知');
    console.log(data);
}