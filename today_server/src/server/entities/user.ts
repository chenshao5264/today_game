import { UserSate } from '../defines/enums';
import BodyType = require('../defines/bodys');

export class User {
    
    private _id:      number   = 0;
    private _state:   UserSate = UserSate.STATE_NULL;
    private _isOwner: boolean  = false;
	private _roomid:  number   = 0;
	//private _socket:  BodyType.SocketIO_Socket = null;

	// 基本信息
	private _info: BodyType.UserBody = {
		nickname: '',
		account: '',
		sex: 1,
		gems: 0,
	}
	
	private constructor() {	

	}
	
	public static create(userinfo: BodyType.UserBody): User {
		let user = new User();
		user._info.nickname = userinfo.nickname;
		user._info.account  = userinfo.account;
		user._info.sex      = userinfo.sex;
		user._info.gems     = userinfo.gems;

		return user;
	}

	// public  get socket():  BodyType.SocketIO_Socket  {
	// 	return this._socket;
	// }

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
}