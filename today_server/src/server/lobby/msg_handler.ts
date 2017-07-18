import { protocol } from '../common/socket_protocol';
import { logger } from '../../utils/logger';
import { protobufjs } from '../common/socket_protobufjs';
import { address2ip } from './../../utils/utility';
import { md5 } from '../../utils/crypto';
import { DataMgr } from './dataMgr';
import { UserSate } from '../common/define_body';

import BodyType = require('../common/define_body');
import dbMysql = require('../../tools/dbMysql');
import dbRedis = require('../../tools/dbRedis');

let notifyMsg = function () {

}

let sendMsgAck = function(socket: BodyType.SocketIO_Socket, packet: any) {
    if (socket.connected) {

        logger.info(packet);

        packet = protobufjs.encode(packet);
        socket.emit('message', packet);
    } else {
        logger.trace(address2ip(socket.handshake.address) + ' socket 已断开');
    }
}

export let MsgHandler = {};
MsgHandler['ON_DISCONNECT'] = function(userid: number) {
    let user = DataMgr.getInstance().getUser(userid);
    if (user) {
        if (user.getState() == UserSate.STATE_ROOM) {
            if (user.getIsOwner()) {
                let roomid = user.getRoomId();
                if (roomid != 0) {
                    DataMgr.getInstance().dissolveRoom(roomid);
                }
            }
        }
    }
}

MsgHandler[protocol.P_CL_LOBBY_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.MsgPacket) {
    logger.trace("处理lobby登录请求");

    let bodyFromClient: BodyType.LobbyBody = msg.lobby;
    let userid = bodyFromClient.userid
    async function async_getSign() {
        let sign = await dbRedis.async_get('sign:' + userid);

        let body2Client: BodyType.LobbyBody = {}
        if (sign == bodyFromClient.sign) {
            body2Client.errcode = 0;
        } else {
            body2Client.errcode = 1;
        }

        let packet: BodyType.MsgPacket = {msgid: protocol.P_LC_LOBBY_ACK};
        packet.lobby = body2Client;

        sendMsgAck(socket, packet);

        return body2Client.errcode == 1 ? true : false;
    }

    if (!async_getSign()) {
        return;
    }

    socket.userid = userid;
    DataMgr.getInstance().appendUser(userid);
    dbRedis.hmset('userid:' + userid, {'state': UserSate.STATE_LOBBY});
}

MsgHandler[protocol.P_CL_SELECT_GAME_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.MsgPacket) {
    logger.trace("处理选择游戏请求");
}

MsgHandler[protocol.P_CL_CREATE_ROOM_REQ] = function(socket: BodyType.SocketIO_Socket, msg: BodyType.MsgPacket) {
    logger.trace("处理create room请求");

    let bodyFromClient: BodyType.RoomBody = msg.room;
    let userid = socket.userid;

    let packet: BodyType.MsgPacket = {msgid: protocol.P_LC_CREATE_ROOM_ACK}
    let body2Client: BodyType.RoomBody = {};

    let user = DataMgr.getInstance().getUser(userid);

    if (user && user.getState() == UserSate.STATE_LOBBY) {
        let roomid = DataMgr.getInstance().createRoom(userid);
        if (roomid != 0) {
            body2Client.errcode = 0;
            body2Client.roomid = roomid;
            logger.info(roomid + ' 房间创建');
        } else {
            body2Client.errcode = 1;
        }
    } else {
        body2Client.errcode = 1;
    }

    packet.room = body2Client;

    sendMsgAck(socket, packet);
}

