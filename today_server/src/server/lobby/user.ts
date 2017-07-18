import { UserSate } from '../common/enums';
import BodyType = require('../common/define_body');

// 只在进入大厅时实例化
export class User {
    
    private _id:      number   = 0;
    private _state:   UserSate = UserSate.STATE_NULL;
    private _isOwner: boolean  = false;
	private _roomid:  number   = 0;
	private _socket:  BodyType.SocketIO_Socket = null;
	
	private constructor() {	
		this._state = UserSate.STATE_LOBBY;
	}
	
	public static create(userid: number, socket: BodyType.SocketIO_Socket): User {
		let user = new User();
		user._id    = userid;
		user._socket = socket;
		return user;
	}

	public  get socket():  BodyType.SocketIO_Socket  {
		return this._socket;
	}
	


    public get roomid():    number    {
		return this._roomid;
	}

	public set roomid(value:    number   ) {
		this._roomid = value;
	}

	public get id():    number    {
		return this._id;
	}

	public set id(value:    number   ) {
		this._id = value;
	}

	public get state(): UserSate  {
		return this._state;
	}

	public set state(value: UserSate ) {
		this._state = value;
	}

	public get isOwner():   boolean   {
		return this._isOwner;
	}

	public set isOwner(value:   boolean  ) {
		this._isOwner = value;
	}

    // public enterRoom() {
    //     this._state = UserSate.STATE_ROOM;
    // }

    // public leaveRoom() {
    //     this._state = UserSate.STATE_LOBBY;
	// }
}