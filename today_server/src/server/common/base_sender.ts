import { logger } from '../../utils/logger';
import { protocol } from '../common/socket_protocol';
import { protobufjs } from '../common/socket_protobufjs';
import { User } from '../entities/user';

import BodyType = require('../defines/bodys');
import { address2ip } from './../../utils/utility';

export let sendMsgAck = function (socket: SocketIO.Socket, packet) {
    if (socket.connected) {
        packet = protobufjs.encode(packet);
        socket.emit('message', packet);
    } else {
        logger.trace(address2ip(socket.handshake.address) + ' socket 已断开');
    }
}

export class BaseSender {

    private notifyMessage(targets: {[key: number]: User}, packet: BodyType.BaseBody, userid: number = 0) {
        for (let uid in targets) {
            if (userid != parseInt(uid)) {
                let target = targets[uid];
                if (target) {
                    sendMsgAck(target.socket, packet);
                }
            }
        }
    }

    public notifyLeaveRoom(targets: {[key: number]: User}, userid: number) {
        let packet: BodyType.BaseBody = {msgid: protocol.P_GC_LEAVE_ROOM_NOT};
        let ServerData: BodyType.RoomBody = {};
        ServerData.userid = userid;
        packet.room = ServerData;

        this.notifyMessage(targets, packet, userid);
    }

    public notifyDissolveRoom(targets: {[key: number]: User}) {
        let packet: BodyType.BaseBody = {msgid: protocol.P_GC_DISSOLVE_ROOM_NOT};
        let ServerData: BodyType.ReigsterBody = {}        
        packet.room = ServerData;

        this.notifyMessage(targets, packet);
    }

    public notifyHandUp(targets: {[key: number]: User}, userid: number) {
        let packet: BodyType.BaseBody = {msgid: protocol.P_GC_HAND_UP_NOT};
        let ServerData: BodyType.HandUpBody = {}
        ServerData.userid = userid;        
        packet.room = ServerData;

        this.notifyMessage(targets, packet, userid);
    }
}