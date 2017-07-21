import { logger } from './../../utils/logger';
import { Room } from '../entities/room';
import { DataHelper } from './data_helper';
import { RoomSate, UserSate } from '../defines/enums';

export class RoomHelper {
    private static readonly _roomHelper: RoomHelper = new RoomHelper();

    public static getInstance(): RoomHelper {
        return this._roomHelper;
    }

    private constructor() {

    }

    // {roomid: room}
    private _rooms: {[key: number]: Room} = {};

    // 生成房间号
    private generate_roomid(): number {
        while (true) {
            let roomid = Math.floor(Math.random() * 1000000);
            if (!this._rooms[roomid]) {
                return 111111;
                //return roomid;
            } 
        }
    }

    // 离开房间
    public leaveRoom(userid: number) {
        
        let user = DataHelper.getInstance().getUserById(userid);
        if (user.state != UserSate.STATE_ROOM) {
            logger.info(userid + ' 玩家状态不对 ' + user.state);
            return;
        }
        logger.info(userid + ' 离开房间')

        if (user.isOwner) {
            this.dissolveRoom(user.roomid);
        } else {
            let room = this._rooms[user.roomid];
            if (room) {
                room.delUser(userid);
            }
        }
    }

    // 解散房间
    public dissolveRoom(roomid: number) {
        let room = this._rooms[roomid];
        if (!room) {
            return;
        }

        room.dissolve();
        delete this._rooms[roomid];
        logger.info('房间解散: ' + roomid);
    }

    // 创建房间
    public createRoom(userid: number) {
        let user = DataHelper.getInstance().getUserById(userid);

        let roomid = this.generate_roomid();
        let room = Room.create(roomid, userid);
        room.enter(user, true);
        this._rooms[roomid] = room;

        console.log(this._rooms);

        logger.info('房间创建成功: ' + roomid);

        return roomid;
    }

    // 进入房间
    public enterRoom(userid: number, roomid: number) {
        let user = DataHelper.getInstance().getUserById(userid);
        let room = this._rooms[roomid];

        let errcode = 0;

        if (user && room) {
            if (room.state == RoomSate.STATE_WAIT) {
                logger.info(userid + " 进入房间");
                room.enter(user, false);
            } else  {
                logger.info('房间状态不对 ' + room.state);
                errcode = 4;
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
}