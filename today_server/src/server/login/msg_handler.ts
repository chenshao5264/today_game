import { protocol } from '../common/socket_protocol';
import { logger } from '../../utils/logger';
import { protobufjs } from '../common/socket_protobufjs';
import { address2ip } from './../../utils/utility';
import { md5 } from "../../utils/crypto";

import BodyType = require('../common/define_body');
import db = require('../../tools/db');

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
    let body: BodyType.ReigsterBody = msg.register;

    async function async_is_account_exsit(account: string): Promise<boolean> {
         return new Promise<boolean>((resolve, reject) => {
            db.is_account_exsit(account, function(exist) {
                resolve(exist);
            }); 
        });
    }

    async function async_create_account(account: string, password: string): Promise<boolean> {
         return new Promise<boolean>((resolve, reject) => {
            db.create_account(account, password, function(suc) {
                resolve(suc);
            }) 
        });
    }

    async function async_create_user(parms: BodyType.UserBody): Promise<boolean> {
         return new Promise<boolean>((resolve, reject) => {
            db.create_user(parms, function(suc) {
                resolve(suc);
            }) 
        });
    }

    let ret = -1;
    async function async_register(account: string, password: string) {
        let exist = await async_is_account_exsit(account);
        console.log("exist = " + exist);
        if (exist) {
            ret = 1;
        } else {
            let suc = await async_create_account(account, password);
            if (suc) {
                ret = 0;
                let succ = await async_create_user({account: account, nickname: '辰少01', gems: 100})
                if (succ) {
                    logger.trace(account + '创建成功');
                }
            } else {
                ret = 2;
            }
        }

        let packet: BodyType.MsgPacket = {msgid: protocol.P_LC_REGISTER_ACK};
        let body: BodyType.ReigsterBody = {};
        body.errcode    = ret;
        packet.register = body;

        sendMsgAck(socket, packet);  
    }

    async_register(body.account, body.password);

    // todo

    // let packet: BodyType.MsgPacket = {msgid: protocol.P_LC_REGISTER_ACK};
    // packet.register = {};

    // db.is_account_exsit(body.account, function(exist) {
    //     if (exist) {
    //         packet.register = {errcode: 1};
    //         sendMsgAck(socket, packet);  
    //     } else {
    //         db.create_account(body.account, body.password, function(suc) {
    //             let ret
    //             if (suc) {
    //                 ret = 0;
    //             } else {
    //                 ret = 2;
    //             }

    //             packet.register = {errcode: ret};
    //             sendMsgAck(socket, packet);  
    //         })
    //     }
    // });
}

MsgHandler[protocol.P_CL_LOGIN_REQ] = function(socket: SocketIO.Socket, msg: BodyType.MsgPacket) {
    logger.trace("处理登路请求");
    let body: BodyType.LoginBody = msg.login;

    db.get_account_info(body.account, function(info: BodyType.AccountBody) {
        if (info.password == body.password) {
            logger.trace('验证成功')

            db.get_user_info(body.account, function(userinfo: BodyType.UserBody) {
                let sign = md5(userinfo.account + body.password);
            })
        } else {
            logger.trace('验证失败')
        }
    })
}