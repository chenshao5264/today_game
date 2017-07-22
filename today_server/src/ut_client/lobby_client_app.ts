import io = require('socket.io-client');

import { protobufjs } from '../server/common/socket_protobufjs';
import { protocol } from '../server/common/socket_protocol';
import BodyType = require('../server/defines/bodys')


import gameApp = require('./game_client_app');

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
    let packet: BodyType.BaseBody = {msgid: protocol.P_CS_LOGIN_REQ};
    let body: BodyType.LobbyBody = {}

    body.account = _account;
    body.sign   = _sign;

    packet.lobby = body;

    console.log(packet)

    packet = protobufjs.encode(packet);
    socket.emit('message', packet)
}





let _userid = 0

//-- 消息处理
let MSG = {};
MSG[protocol.P_SC_LOGIN_ACK] = function(data: BodyType.BaseBody) {
    console.log(data);
    let body = data.lobby;

    _userid = body.userinfo.userid;
    
    if (body.errcode == 0) {
        console.log('lobby 登录成功');
        selectGame();
    } else {
        console.log('errcode = ' + body.errcode);
    }
}

function selectGame() {
    let packet: BodyType.BaseBody = {msgid: protocol.P_CS_SELECT_GAME_REQ};
    let body: BodyType.SelectGameBody = {};
    body.gameid = 1;

    packet.selectgame = body;

    packet = protobufjs.encode(packet);
    socket.emit('message', packet)
}

MSG[protocol.P_SC_SELECT_GAME_ACK] = function(data: BodyType.BaseBody) {
    console.log(data);
    let body = data.selectgame;
    if (body.errcode == 0) {
        gameApp.start(_userid, _account, _sign, _action);
    } else {
        console.log('errcode = ' + body.errcode);
    }
}






