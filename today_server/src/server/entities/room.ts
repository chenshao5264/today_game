import { logger } from './../../utils/logger';
import { User } from './user';
import { UserSate, RoomSate } from '../defines/enums';
import { MsgSender } from '../game_common/msg_sender';
import BodyType = require('../defines/bodys');
import { RoomHelper } from '../game_common/room_helper';
import dbMysql = require('../../tools/dbMysql');

export class Room {
    private constructor() {

    }
    
    public static create(roomid: number, ownerid: number) {
        let room = new Room();
        room._id      = roomid;
        room._ownerid = ownerid;
        
        return room;
    }
    
    private _users:       {[key:   number]: User} = {};  // {userid: user}
    private _ownerid:     number = 0;   // 房主id
    private _id:          number = 0;   // 房间号
    private _state:       number = RoomSate.STATE_WAIT; // 房间状态
    private _count:       number = 0; //房间人数
    private _handUpCount: number = 0; //举手人数

    public get users(): {[key: number]: User} {
        return this._users;
    }

	public get state():   number  {
		return this._state;
	}

	public set state(value:   number ) {
		this._state = value;
	}
    
	public get id(): number  {
		return this._id;
	}
    
    public set ownerid(value: number) {
        this._ownerid = value;
    }

    public getUsers() {
        return this._users;
    }   

    public delUser(userid: number) {      
        let user = this._users[userid];
        if (user) {
            user.state = UserSate.STATE_LOBBY;
            delete this._users[userid];

            --this._count;
            logger.info("房间人数 = " + this._count);

            this._state = RoomSate.STATE_WAIT;
        }
    }

    public dissolve() {
        for (let uid in this._users) {
            this.delUser(parseInt(uid));
        }
    }

    public joinUser(user: User, isOwner: boolean) {
        this._users[user.id] = user;
        user.isOwner = isOwner;
        user.roomid  = this._id;    
        user.state   = UserSate.STATE_ROOM;

        ++this._count;
        logger.info("房间人数 = " + this._count);

        if (this._count == RoomHelper.getInstance().minCount) {
            logger.info('房间满员, 开始游戏倒计时');
            this._state = RoomSate.STATE_READY;
        } 
    }

    private gameStart() {
        logger.info('开始游戏');
        this._state = RoomSate.STATE_GAMING;

        let owner = this._users[this._ownerid];
        --owner.gems;

        dbMysql.async_update_user_value(this._ownerid, 'gems', owner.gems);
    }

    // 举手
    public handUp(user: User) {
        if (user) {
            user.state = UserSate.STATE_READY;
            ++this._handUpCount;

            logger.info(user.id + " 举手");

            if (this._handUpCount == RoomHelper.getInstance().minCount) {
                this.gameStart();
            }
        }
    }
}