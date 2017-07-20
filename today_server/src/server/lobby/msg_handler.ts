import { protocol } from '../common/socket_protocol';
import { logger } from '../../utils/logger';
import { protobufjs } from '../common/socket_protobufjs';
import { address2ip } from './../../utils/utility';
import { md5 } from '../../utils/crypto';
import { DataHelper } from './data_helper';
import { UserSate } from '../defines/enums';
import { User } from '../entities/user';
import { RoomHelper } from './room_helper';

import BodyType = require('../defines/bodys');
import dbMysql = require('../../tools/dbMysql');
import dbRedis = require('../../tools/dbRedis');


let sendMsgAck = function(socket: BodyType.SocketIO_Socket, packet: BodyType.BaseBody) {
    if (socket.connected) { 

        logger.info("packet = " + JSON.stringify(packet));

        packet = protobufjs.encode(packet);
        socket.emit('message', packet);
    } else {
        logger.trace(address2ip(socket.handshake.address) + ' socket 已断开');
    }
}

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

MsgHandler[protocol.P_CL_LOBBY_REQ] = async function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
    logger.trace("处理lobby登录请求");

    let clientData: BodyType.LobbyBody = msg.lobby;
    let serverData: BodyType.LobbyBody = {}

    let sign = await dbRedis.async_get('sign:' + clientData.account);
    if (sign == clientData.sign) {
        serverData.errcode = 0;
    } else {
        serverData.errcode = 1;
    }

    
    //dbRedis.hmset('userid:' + userid, {'state': UserSate.STATE_LOBBY});
    await DataHelper.getInstance().appendUser(clientData.account, socket);

    let packet: BodyType.BaseBody = {msgid: protocol.P_LC_LOBBY_ACK};
    packet.lobby = serverData;
    sendMsgAck(socket, packet);
}

MsgHandler[protocol.P_CL_SELECT_GAME_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
    logger.trace("处理选择游戏请求");
}

MsgHandler[protocol.P_CL_CREATE_ROOM_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
    logger.trace("处理create room请求");

    let clientData: BodyType.RoomBody = msg.room;
    let userid = socket.userid;

    let packet: BodyType.BaseBody = {msgid: protocol.P_LC_CREATE_ROOM_ACK}
    let serverData: BodyType.RoomBody = {};

    let user = DataHelper.getInstance().getUserById(userid);

    if (user) {
        let roomid = RoomHelper.getInstance().createRoom(userid);
        if (roomid != 0) {
            serverData.errcode = 0;
            serverData.roomid = roomid;
        } else {
            serverData.errcode = 1;
        }
    } else {
        serverData.errcode = 2;
    }

    packet.room = serverData;
    sendMsgAck(socket, packet);
}

MsgHandler[protocol.P_CL_ENTER_ROOM_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
    logger.trace("enter room 请求");

    // let bodyFromClient: BodyType.RoomBody = msg.room;
    // console.log(bodyFromClient);
    // let roomid = bodyFromClient.roomid;

    // let packet: BodyType.BaseBody = {msgid: protocol.P_LC_ENTER_ROOM_ACK}
    // let body2Client: BodyType.RoomBody = {};

    // let userid  = socket.userid;
    // let errcode = DataMgr.getInstance().enterRoom(userid, roomid);
    // body2Client.errcode = errcode;

    // packet.room = body2Client;

    // sendMsgAck(socket, packet);
}

MsgHandler[protocol.P_CL_HAND_UP_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
    logger.trace('hand up 请求');

}
