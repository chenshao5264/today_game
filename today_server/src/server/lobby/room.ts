import { logger } from './../../utils/logger';
import { User } from './user';
import { UserSate, RoomrSate } from '../common/enums';
import { MsgSender } from '../lobby/msgSender';
import BodyType = require('../common/define_body');
import { roomConfig } from '../../config';

export class Room {
    private constructor() {
        this._count = 0;
        this._state = RoomrSate.STATE_WAIT;
    }
    
    public static create(roomid: number, ownerid: number) {
        let room = new Room();
        room._id      = roomid;
        room._ownerid = ownerid;
        

        return room;
    }
    
    private _users: {[key: number]: User} = {};  // {userid: user}
    private _ownerid: number = 0;   // 房主id
    private _id:      number = 0;   // 房间号
    private _state:   number = RoomrSate.STATE_NULL; // 房间状态
    private _count:   number = 0; //房间人数

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
            MsgSender.getInstance().notifyUserLeaveRoom(this._users, userid);
        }
    }

    public dissolve() {
        for (let uid in this._users) {
            this.delUser(parseInt(uid));
        }

        this._count = 0;
    }

    public enter(user: User, isOwner: boolean) {
        this._users[user.id] = user;
        user.isOwner = isOwner;
        user.roomid  = this._id;    
        user.state   = UserSate.STATE_ROOM;

        ++this._count;
        logger.info("房间人数 = " + this._count);

        if (this._count == roomConfig().min_limit) {
            logger.info('房间满员');
            this._state = RoomrSate.STATE_READY;

            //MsgSender.getInstance().notifyGameStart(this._users);
        }
    }
}