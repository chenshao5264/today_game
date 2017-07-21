import { protocol } from '../common/socket_protocol';
import { logger } from '../../utils/logger';
import { protobufjs } from '../common/socket_protobufjs';
import { User } from './user';
import BodyType = require('../defines/bodys');

export class MsgSender {
    private static readonly _msgSender: MsgSender = new MsgSender();

    public static getInstance(): MsgSender {
        return this._msgSender;
    }

    private constructor() {

    }

    // 通知游戏开始
    public notifyGameStart(targets: {[key: number]: User}) {
        for (var uid in targets) {
            let target = targets[uid];
            if (target) {
                let packet: BodyType.BaseBody = {msgid: protocol.P_LC_START_GAME_NOT};
                let body: BodyType.GameStartBody = {};
                packet.gamestart = body;
                packet = protobufjs.encode(packet);
                target.socket.emit('message', packet);
                logger.info('游戏开始');
            }
        }
    }

    // 通知玩家离开
    public notifyUserLeaveRoom(targets: {[key: number]: User}, userid: number) {
        for (var uid in targets) {
            let target = targets[uid];
            if (target) {
                let packet: BodyType.BaseBody = {msgid: protocol.P_GC_LEAVE_ROOM_NOT};
                let body: BodyType.RoomBody = {};
                body.userid = userid;
                packet.room = body;
                packet = protobufjs.encode(packet);
                target.socket.emit('message', packet);
                logger.info("packet = " + JSON.stringify(packet) + '   ' + uid);
            }
        }
    }
}