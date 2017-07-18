import { logger } from './../../utils/logger';
import { User } from './user';
import { UserSate } from '../common/enums';

export class Room {
    private constructor() {

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
    private _state:   number = 0; // 房间状态

	public get id(): number  {
		return this._id;
	}
    
    public set ownerid(value: number) {
        this._ownerid = value;
    }

    public getUsers() {
        return this._users;
    }   

    public delUser(userid: number|string) {
        let user = this._users[userid];
        if (user) {
            user.state = UserSate.STATE_LOBBY;
            delete this._users[userid];
        }
    }

    public dissolve() {
        for (let uid in this._users) {
            this.delUser(uid);
        }
    }

    public enter(user: User, isOwner: boolean) {
        this._users[user.id] = user;
        user.isOwner = isOwner;
        user.roomid  = this._id;    
        user.state   = UserSate.STATE_ROOM;

        console.dir(this._users);
    }

}