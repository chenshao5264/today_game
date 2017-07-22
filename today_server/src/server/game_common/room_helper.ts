import { logger } from './../../utils/logger';
import { Room } from '../entities/room';
import { DataHelper } from './data_helper';
import { RoomSate, UserSate } from '../defines/enums';
import { MsgSender } from '../game_common/msg_sender';
import { User } from '../entities/user';

export class RoomHelper {
    private static readonly _roomHelper: RoomHelper = new RoomHelper();

    public static getInstance(): RoomHelper {
        return this._roomHelper;
    }

    private constructor() {

    }

    // {roomid: room}
    private _rooms: {[key: number]: Room} = {};
    private _gameid: number; // 当前房间游戏gameid
    private _minCount: number; //游戏开始人数
    private _needGems: number;
    private _totalRound: number;

	public get needGems(): number {
		return this._needGems;
	}

	public set needGems(value: number) {
		this._needGems = value;
	}

	public get totalRound(): number {
		return this._totalRound;
	}

	public set totalRound(value: number) {
		this._totalRound = value;
	}
    

	public get minCount(): number {
		return this._minCount;
	}

	public set minCount(value: number) {
		this._minCount = value;
	}
    

	public get gameid(): number {
		return this._gameid;
	}

	public set gameid(value: number) {
		this._gameid = value;
	}
    

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
        if (user.state == UserSate.STATE_ROOM || user.state == UserSate.STATE_READY) {
            if (user.isOwner) {
                this.dissolveRoom(user.roomid);
            } else {
                let room = this._rooms[user.roomid];
                if (room) {
                    MsgSender.getInstance().notifyLeaveRoom(room.users, userid);
                    room.delUser(userid);
                }
            }
            logger.info(userid + ' 离开房间')
        } else {
            logger.info(userid + ' 玩家状态不对 ' + user.state);
        }
    }

    // 解散房间
    public dissolveRoom(roomid: number) {
        let room = this._rooms[roomid];
        if (!room) {
            return;
        }

        MsgSender.getInstance().notifyDissolveRoom(room.users);

        room.dissolve();
        delete this._rooms[roomid];
        logger.info('房间解散: ' + roomid);
    }

    // 创建房间
    public createRoom(userid: number) {
        let user = DataHelper.getInstance().getUserById(userid);

        if (user.gems < RoomHelper.getInstance().needGems) {
            return -1;
        }

        let roomid = this.generate_roomid();
        let room = Room.create(roomid, userid);
        room.joinUser(user, true);
        this._rooms[roomid] = room;

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
                room.joinUser(user, false);
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

    public getRoom(roomid: number): Room {
        return this._rooms[roomid];
    }

    public handUp(userid: number) {
        let user = DataHelper.getInstance().getUserById(userid);
        let room = this._rooms[user.roomid];
        if (room) {
            room.handUp(user);

            MsgSender.getInstance().notifyHandUp(room.users, userid);
        }
    }
}