import { protocol } from '../common/socket_protocol';
import { logger } from '../../utils/logger';
import { protobufjs } from '../common/socket_protobufjs';
import { address2ip } from './../../utils/utility';
import { md5 } from '../../utils/crypto';

import BodyType = require('../defines/bodys');
import dbMysql = require('../../tools/dbMysql');
import dbRedis = require('../../tools/dbRedis');
import { mini_game_config } from '../config';

import { sendMsgAck } from '../common/base_sender';

export let MsgHandler = {};
MsgHandler['ON_DISCONNECT'] = function(userid: number) {

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

    let gameConfig = mini_game_config(clientData.gameid);

    serverData.errcode = 0;
    serverData.ip   = gameConfig.ip;
    serverData.port = gameConfig.port;

    let packet: BodyType.BaseBody = {msgid: protocol.P_SC_SELECT_GAME_ACK};
    packet.selectgame = serverData;

    console.log(packet)
    sendMsgAck(socket, packet);
}