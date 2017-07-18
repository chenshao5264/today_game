import { logger } from './../../utils/logger';
import { Room } from './room';
import { User } from './user';

import { UserSate, RoomrSate } from '../common/enums';


import BodyType = require('../common/define_body');
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

    public appendUser(userid: number, socket: BodyType.SocketIO_Socket) {
        if (this._users[userid]) {
            delete this._users[userid];
        }
        let user = User.create(userid, socket);
        this._users[userid] = user;
        
        logger.info("appendUser = " + userid);
    }

    public getUser(userid: number) {
        return this._users[userid];
    }

    public delUser(userid: number) {

        
    }


    // 生成房间号
    private generate_roomid(): number {

       // logger.info("generate_roomid = " + JSON.stringify(this._rooms));
        while (true) {
            let roomid = Math.floor(Math.random() * 1000000);
            if (!this._rooms[roomid]) {
                return 111111;
               // return roomid;
            } 
        }
    }

    // 创建房间
    public createRoom(userid: number) {
        let user = this._users[userid];
        
        let roomid = 0;
        if (user.state == UserSate.STATE_LOBBY) {
            roomid   = this.generate_roomid();
            let room = Room.create(roomid, userid);
            this._rooms[roomid] = room;

            room.enter(user, true);
        }     

        logger.info('房间创建成功并进入房间: ' + roomid);
        return roomid;
    }

    // 判断房间是否存在
    public isExistRoom(roomid: number) {
        if (this._rooms[roomid]) {
            return true;
        } else {
            logger.info('房间不存在: ' + roomid);
            return false;
        }
    }

    // 进入房间
    public enterRoom(userid: number, roomid: number) {
        let user = this._users[userid];
        let room = this._rooms[roomid];

        let errcode = 0;
        if (user && room) {
            if (user.state == UserSate.STATE_LOBBY) {
                if (room.state == RoomrSate.STATE_WAIT) {
                    logger.info(userid + " 进入房间");
                    room.enter(user, false);
                } else {
                     logger.info('房间状态不对 ' + room.state);
                     errcode = 4;
                }
                
            } else {
                logger.info('用户状态不对: ' + user.state);
                errcode = 1;
            }
        } else {
            if (!user) {
                logger.info('用户不存在: ' + userid);
                errcode = 2;
            } else {
                logger.info('房间不存在: ' + roomid);
                errcode = 3;
            }
        }

        return errcode;
    }

    // 离开房间
    public leaveRoom(userid: number) {
        logger.info(userid + ' 离开房间')
        let user = this._users[userid];
        
        if (!user) {
            return;
        }

        if (user.state != UserSate.STATE_ROOM) {
            return;
        }

        let roomid = user.roomid;
        if (user.isOwner) { // 房主离开 解散房间
            this.dissolveRoom(roomid);
        } else {
            let room = this._rooms[roomid];
            if (room) {
                room.delUser(userid);
            }
        }
    }

    // 解散房间
    public dissolveRoom(roomid) {
        let room = this._rooms[roomid];
        if (!room) {
            return;
        }

        room.dissolve();
        delete this._rooms[roomid];

        logger.info('房间解散: ' + roomid);
    }

    // 查找房间
    public getRoom(roomid): Room {
        return this._rooms[roomid];
    }
}