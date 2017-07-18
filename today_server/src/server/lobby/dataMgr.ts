import { logger } from './../../utils/logger';
import { Room } from './room';
import { User } from './user';

import { UserSate } from '../common/define_body';
import { sendMsgAck } from '../lobby/msg_handler';


export class DataMgr {
    private static readonly _dataMgr: DataMgr = new DataMgr();

    public static getInstance(): DataMgr {
        return this._dataMgr;
    }

    private constructor() {

    }

    // {userid: user}
    private _users: {[key: number]: User} = {};
    // {roomid: room}
    private _rooms: {[key: number]: Room} = {};

    public appendUser(userid: number) {
        let user = this._users[userid]
        if (!user) {
            let user = new User(userid);
            user.setState(UserSate.STATE_LOBBY);
            this._users[userid] = user;
        }
    }

    public delUser(userid: number) {
        if (this._users[userid]) {
            delete this._users[userid];
        }
    }

    public getUser(userid: number) {
        return this._users[userid];
    }

    // 生成房间号
    private generate_roomid(): number {
        while (true) {
            let roomid = Math.floor(Math.random() * 1000000);
            if (!this._rooms[roomid]) {
                return roomid;
            }
        }
    }

    // 创建房间
    public createRoom(userid: number) {
        let user = this._users[userid];

        let roomid = 0;
        if (user.getState() == UserSate.STATE_LOBBY) {
            roomid = this.generate_roomid();
            let room = new Room(roomid);
            this._rooms[roomid] = room;
            room.join(user);
            room.setOwnerId(userid);
            user.setIsOwner(true);
            user.setRoomId(roomid);
        }     
        return roomid;
    }

    // 解散房间
    public dissolveRoom(roomid) {
        let room = this._rooms[roomid];
        if (!room) {
            return;
        }

        for (let i = 0; i < room.getUsers().length; ++i) {
            let user = room.getUsers()[i];
            if (user) {
                user.leaveRoom();
            }
        }
        
        delete this._rooms[roomid];
    }

    // 查找房间
    public getRoom(roomid): Room {
        return this._rooms[roomid];
    }
}