import { protocol } from '../common/socket_protocol';
import { logger } from '../../utils/logger';
import { protobufjs } from '../common/socket_protobufjs';
import { User } from './user';
import BodyType = require('../common/define_body');

export class MsgSender {
    private static readonly _msgSender: MsgSender = new MsgSender();

    public static getInstance(): MsgSender {
        return this._msgSender;
    }

    private constructor() {

    }

    public notifyUserLeaveRoom(targets: {[key: number]: User}, userid: number) {
        
        for (var uid in targets) {
            let target = targets[uid];

            if (target) {
                let packet: BodyType.BaseBody = {msgid: protocol.P_LC_LEAVE_ROOM_NOTIFY};
                let body: BodyType.RoomBody = {};
                body.userid = userid;
                
                packet.room = body;
                logger.info("packet = " + JSON.stringify(packet) + '   ' + uid);
            
                packet = protobufjs.encode(packet);
            
                target.socket.emit('message', packet);
            }
            
        }
    }
}