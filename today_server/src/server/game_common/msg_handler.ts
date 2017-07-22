import { protocol } from '../common/socket_protocol';
import { logger } from '../../utils/logger';
import { protobufjs } from '../common/socket_protobufjs';
import { address2ip } from './../../utils/utility';
import { md5 } from '../../utils/crypto';
import { UserSate } from '../defines/enums';

import BodyType = require('../defines/bodys');
import dbRedis = require('../../tools/dbRedis');

import { sendMsgAck } from '../common/base_sender';
import { DataHelper } from './data_helper';
import { RoomHelper } from './room_helper';



export let MsgHandler = {};

MsgHandler['ON_DISCONNECT'] = function(userid: number) {
    let user = DataHelper.getInstance().getUserById(userid);
    if (!user) {
        return;
    }

    RoomHelper.getInstance().leaveRoom(userid);
    
}

MsgHandler[protocol.P_CG_LOGIN_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
    logger.trace("处理login请求");

    let clientData: BodyType.GameLoginBody = msg.gamelogin; 
    let serverData: BodyType.GameLoginBody = {} 

    console.log(clientData);

    async function async_cg_login() {
        let sign = await dbRedis.async_get('sign:' + clientData.account);
        if (sign == clientData.sign) {
            serverData.errcode = 0;
            socket.userid = clientData.userid;
            logger.trace(clientData.userid + " 连接验证成功");

            await DataHelper.getInstance().appendUser(clientData.account, socket);
        } else {
            serverData.errcode = 1;
            logger.trace(clientData.userid + " 连接验证失败");
        }
    }

    async_cg_login().then(function() {
        let packet: BodyType.BaseBody = {msgid: protocol.P_GC_LOGIN_ACK};
        packet.gamelogin = serverData;
        sendMsgAck(socket, packet);
    });
}

MsgHandler[protocol.P_CG_CREATE_ROOM_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
    logger.trace("处理create room请求");
    let clientData: BodyType.RoomBody = msg.room;

    if (socket.userid != clientData.userid) {
        logger.warn('userid 非法 ' + socket.userid + ' != ' + clientData.userid);
        return;
    }

    let userid = socket.userid;

    let packet: BodyType.BaseBody = {msgid: protocol.P_GC_CREATE_ROOM_ACK}
    let serverData: BodyType.RoomBody = {};

    let user = DataHelper.getInstance().getUserById(userid);
    if (user) {
        let roomid = RoomHelper.getInstance().createRoom(userid);
        if (roomid > 0) {
            serverData.errcode = 0;
            serverData.roomid = roomid;
        } else {
            serverData.errcode = roomid;
        }
    } else {
        serverData.errcode = 2;
    }

    packet.room = serverData;
    sendMsgAck(socket, packet);
}

MsgHandler[protocol.P_CG_ENTER_ROOM_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
    logger.trace("enter room 请求");

    let clientData: BodyType.RoomBody = msg.room;
    if (socket.userid != clientData.userid) {
        logger.warn('userid 非法 ' + socket.userid + ' != ' + clientData.userid);
        return;
    }

    let roomid = clientData.roomid;

    let packet: BodyType.BaseBody = {msgid: protocol.P_GC_ENTER_ROOM_ACK}
    let serverData: BodyType.RoomBody = {};

    let userid  = socket.userid;
    let errcode = RoomHelper.getInstance().enterRoom(userid, roomid);
    serverData.errcode = errcode;

    packet.room = serverData;

    sendMsgAck(socket, packet);
}

MsgHandler[protocol.P_CG_LEAVE_ROOM_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
    logger.trace("leave room req 请求");

    let clientData: BodyType.RoomBody = msg.room;
    let userid = clientData.userid

    if (socket.userid != userid) {
        logger.warn('userid 非法 ' + socket.userid + ' != ' + userid);
        return;
    }

    let packet: BodyType.BaseBody = {msgid: protocol.P_GC_LEAVE_ROOM_ACK}
    let serverData: BodyType.RoomBody = {}
    serverData.errcode = 0;

    packet.room = serverData;

    sendMsgAck(socket, packet);

    RoomHelper.getInstance().leaveRoom(userid);
    DataHelper.getInstance().delUser(userid);
}

MsgHandler[protocol.P_CG_HAND_UP_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.BaseBody) {
    logger.trace("hand up req 请求");

    let clientData: BodyType.HandUpBody = msg.handup;
    let userid = clientData.userid

    if (socket.userid != userid) {
        logger.warn('userid 非法 ' + socket.userid + ' != ' + userid);
        return;
    }

    RoomHelper.getInstance().handUp(userid);

    let packet: BodyType.BaseBody = {msgid: protocol.P_GC_HAND_UP_ACK}
    let serverData: BodyType.HandUpBody = {}

    packet.handup = serverData;
    sendMsgAck(socket, packet);
}