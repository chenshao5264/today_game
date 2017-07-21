import { UserSate } from '../defines/enums';
import BodyType = require('../defines/bodys');

export class User {
    
    private _state: UserSate;
    private _isOwner: boolean;
	private _roomid: number;

	private _id: number;
	private _account: string;
	private _nickname: string;
	private _sex: number;
	private _gems: number;

	private constructor() {	

	}
	
	public static create(userinfo: BodyType.UserBody): User {
		let user = new User();
		
		user._id       = userinfo.userid;
		user._account  = userinfo.account;
		user._nickname = userinfo.nickname;
		user._sex      = userinfo.sex;
		user._gems     = userinfo.gems;

		return user;
	}

	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}
	
    public get roomid():    number    {
		return this._roomid;
	}

	public set roomid(value:    number   ) {
		this._roomid = value;
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