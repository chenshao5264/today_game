import { protocol } from '../common/socket_protocol';
import { logger } from '../../utils/logger';
import { protobufjs } from '../common/socket_protobufjs';
import { address2ip } from './../../utils/utility';
import { md5 } from '../../utils/crypto';
//import { UserSate } from '../defines/enums';
//import { User } from '../entities/user';

import BodyType = require('../defines/bodys');
import dbMysql = require('../../tools/dbMysql');
import dbRedis = require('../../tools/dbRedis');

import { sendMsgAck } from '../common/socket_msg';

export let MsgHandler = {};
MsgHandler['ON_DISCONNECT'] = function(userid: number) {
    // let user = DataMgr.getInstance().getUser(userid);
    // if (!user) {
    //     return;
    // }
    // if (user.state == UserSate.STATE_ROOM) {
    //     DataMgr.getInstance().leaveRoom(userid);
    // } else if (user.state == UserSate.STATE_GAMING) {

    // }
}

MsgHandler[protocol.P_CS_LOGIN_REQ] = async function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
    logger.trace("处理lobby登录请求");

    let clientData: BodyType.LobbyBody = msg.lobby;
    let serverData: BodyType.LobbyBody = {}

    async function async_cs_login() {
        let sign = await dbRedis.async_get('sign:' + clientData.account);
        if (sign == clientData.sign) {
            serverData.errcode = 0;
        } else {
            serverData.errcode = 1;
        }

        let userinfo = await dbMysql.async_get_user_info(clientData.account);
        socket.userid = userinfo.userid;

        let packet: BodyType.BaseBody = {msgid: protocol.P_SC_LOGIN_ACK};
        serverData.userinfo = userinfo;
        packet.lobby = serverData;
        sendMsgAck(socket, packet);
    }

    async_cs_login();
}

MsgHandler[protocol.P_CS_SELECT_GAME_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
    logger.trace("处理selectgame请求");
    
    let clientData: BodyType.SelectGameBody = msg.selectgame;
    let serverData: BodyType.SelectGameBody = {}

    serverData.errcode = 0;
    serverData.ip   = '127.0.0.1';
    serverData.port = 9300;

    let packet: BodyType.BaseBody = {msgid: protocol.P_SC_SELECT_GAME_ACK};
    packet.selectgame = serverData;

    console.log(packet)
    sendMsgAck(socket, packet);
}

// MsgHandler[protocol.P_CL_SELECT_GAME_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
//     logger.trace("处理选择游戏请求");
// }

// MsgHandler[protocol.P_CG_CREATE_ROOM_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
//     logger.trace("处理create room请求");
//     let clientData: BodyType.RoomBody = msg.room;

//     if (socket.userid != clientData.userid) {
//         logger.warn('userid 非法 ' + socket.userid + ' != ' + clientData.userid);
//         return;
//     }

//     let userid = socket.userid;

//     let packet: BodyType.BaseBody = {msgid: protocol.P_GC_CREATE_ROOM_ACK}
//     let serverData: BodyType.RoomBody = {};

//     let user = DataHelper.getInstance().getUserById(userid);

//     if (user) {
//         let roomid = RoomHelper.getInstance().createRoom(userid);
//         if (roomid != 0) {
//             serverData.errcode = 0;
//             serverData.roomid = roomid;
//         } else {
//             serverData.errcode = 1;
//         }
//     } else {
//         serverData.errcode = 2;
//     }

//     packet.room = serverData;
//     sendMsgAck(socket, packet);
// }

// MsgHandler[protocol.P_CG_ENTER_ROOM_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
//     logger.trace("enter room 请求");

//     let clientData: BodyType.RoomBody = msg.room;
//     if (socket.userid != clientData.userid) {
//         logger.warn('userid 非法 ' + socket.userid + ' != ' + clientData.userid);
//         return;
//     }

//     let roomid = clientData.roomid;

//     let packet: BodyType.BaseBody = {msgid: protocol.P_GC_ENTER_ROOM_ACK}
//     let serverData: BodyType.RoomBody = {};

//     let userid  = socket.userid;
//     let errcode = RoomHelper.getInstance().enterRoom(userid, roomid);
//     serverData.errcode = errcode;

//     packet.room = serverData;

//     sendMsgAck(socket, packet);
// }

// MsgHandler[protocol.P_CL_HAND_UP_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
//     logger.trace('hand up 请求');

// }
