import { protocol } from '../common/socket_protocol';
import { logger } from '../../utils/logger';
import { protobufjs } from '../common/socket_protobufjs';
import { address2ip } from './../../utils/utility';
import { md5 } from "../../utils/crypto";
import { lobbyConfig } from '../config'; 

import BodyType = require('../defines/bodys');
import dbMysql = require('../../tools/dbMysql');
import dbRedis = require('../../tools/dbRedis');

import { sendMsgAck } from '../common/base_sender';

function packRegisterMsg(msgid: number, body: BodyType.ReigsterBody) {

    let packet: BodyType.BaseBody = {msgid: msgid};
    packet.register = body;

    return packet;
}

export let MsgHandler = {};
MsgHandler[protocol.P_CL_REGISTER_REQ] = function(socket: SocketIO.Socket, msg: BodyType.BaseBody) {
    logger.trace("处理注册请求");

    let clientData: BodyType.ReigsterBody = msg.register;
    let serverData: BodyType.ReigsterBody = {};

    let account = clientData.account;
    let nickname = clientData.nickname;
    let password = clientData.password;

    async function async_register() {
        let ret = 0;
        let exist = await dbMysql.async_is_account_exsit(account);
        if (exist) {
            serverData.errcode = 1;
        } else {
            let suc = await dbMysql.async_create_account(account, password);
            if (suc) {
                serverData.errcode = 0;
                let succ = await dbMysql.async_create_user({account: account, nickname: nickname, sex: 1, gems: 100})
                if (succ) {
                    logger.trace(account + '创建成功');
                } else {

                }
            } else {
                serverData.errcode = 2;
            }
        }
    }   

    async_register().then(function() {
        let packet: BodyType.BaseBody = {msgid: protocol.P_LC_REGISTER_ACK};
        packet.register = serverData;
        sendMsgAck(socket, packet);  
    });
}

MsgHandler[protocol.P_CL_LOGIN_REQ] = function(socket: SocketIO.Socket, msg: BodyType.BaseBody) {
    logger.trace("处理登录请求");
    
    let clientData: BodyType.LoginBody = msg.login;
    let serverData: BodyType.LoginBody = {};

    async function async_login() {
        let info: BodyType.AccountBody = await dbMysql.async_get_account_info(clientData.account);
        if (info && info.password == clientData.password) {
            logger.trace('验证成功');
            //let userinfo: BodyType.UserBody = await dbMysql.async_get_user_info(clientData.account);
            let sign = md5(clientData.account + clientData.password + Date.now());
            let keySign = "sign:" + clientData.account;
            console.log(keySign)
            console.log(sign)
            dbRedis.set(keySign, sign);
            //dbRedis.setKeyExpire(keySign, 5);
            
            serverData.errcode = 0;
            serverData.sign    = sign;
            serverData.ip      = lobbyConfig.ip;
            serverData.port    = lobbyConfig.port;
        } else {
            logger.trace('验证失败');
            serverData.errcode = 1;
        }
    }

    async_login().then(function() {
        let packet: BodyType.BaseBody = {msgid: protocol.P_LC_LOGIN_ACK};
        packet.login = serverData;
        sendMsgAck(socket, packet);
    })
}