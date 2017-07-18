import { protocol } from '../common/socket_protocol';
import { logger } from '../../utils/logger';
import { protobufjs } from '../common/socket_protobufjs';
import { address2ip } from './../../utils/utility';
import { md5 } from "../../utils/crypto";
import { DataMgr } from '../entities/dataMgr';
import { UserSate } from '../common/define_body';

import BodyType = require('../common/define_body');
import dbMysql = require('../../tools/dbMysql');
import dbRedis = require('../../tools/dbRedis');

function sendMsgAck(socket: SocketIO.Socket, packet) {
    if (socket.connected) {
        packet = protobufjs.encode(packet);
        socket.emit('message', packet);
    } else {
        logger.trace(address2ip(socket.handshake.address) + ' socket 已断开');
    }
}

function packRegisterMsg(msgid: number, body: BodyType.ReigsterBody) {

    let packet: BodyType.MsgPacket = {msgid: msgid};
    packet.register = body;

    return packet;
}

export let MsgHandler = {};
MsgHandler[protocol.P_CL_REGISTER_REQ] = function(socket: SocketIO.Socket, msg: BodyType.MsgPacket) {
    logger.trace("处理注册请求");

    async function async_register(account: string, password: string, nickname: string) {
        let ret = -1;
        let exist = await dbMysql.async_is_account_exsit(account);
        if (exist) {
            ret = 1;
        } else {
            let suc = await dbMysql.async_create_account(account, password);
            if (suc) {
                ret = 0;
                let succ = await dbMysql.async_create_user({account: account, nickname: nickname, gems: 100})
                if (succ) {
                    logger.trace(account + '创建成功');
                } else {

                }
            } else {
                ret = 2;
            }
        }

        let packet:      BodyType.MsgPacket    = {msgid: protocol.P_LC_REGISTER_ACK};
        let body2Client: BodyType.ReigsterBody = {};
        body2Client.errcode = ret;
        packet.register     = body2Client;

        sendMsgAck(socket, packet);  
    }   

    let body: BodyType.ReigsterBody = msg.register;
    async_register(body.account, body.password, body.nickname);
}

MsgHandler[protocol.P_CL_LOGIN_REQ] = function(socket: SocketIO.Socket, msg: BodyType.MsgPacket) {
    logger.trace("处理登录请求");
    
    async function login(account: string, password: string) {
        let body: BodyType.LoginBody = {};

        let info: BodyType.AccountBody = await dbMysql.async_get_account_info(account);
        console.dir(info);
        if (info.password == password) {
            
            let userinfo: BodyType.UserBody = await dbMysql.async_get_user_info(account);

            console.dir(userinfo)

            let data = await dbRedis.async_hmget('userid:' + userinfo.userid);
            console.log(data);
            if (data == null || data.state == UserSate.STATE_NULL) {
                logger.trace('验证成功');
                let sign = md5(account + password + userinfo.userid);
                let keySign = "sign:" + userinfo.userid;
                dbRedis.set(keySign, sign);
                
                body.errcode = 0;
                body.sign    = sign;
                body.ip      = '127.0.0.1';
                body.port    = 9200;
                body.user    = userinfo;
            } else {
                logger.trace('验证失败, 已经登录');
                body.errcode = 2;
            }

        } else {
            logger.trace('验证失败');
            body.errcode = 1;
        }

        //console.dir(body);

        let packet: BodyType.MsgPacket = {msgid: protocol.P_LC_LOGIN_ACK};
        packet.login = body;
        sendMsgAck(socket, packet);
    }

    let body: BodyType.LoginBody = msg.login;
    login(body.account, body.password);
}