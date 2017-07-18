import { UserSate } from '../common/define_body';

export class User {
    
    constructor(userid: number) {
        this._userid = userid;
    }

    private _userid:    number   = 0;
    private _userState: UserSate = UserSate.STATE_NULL;
    private _isOwner:   boolean  = false;
    private _roomid:    number   = 0;

    public setRoomId(roomid) {
        this._roomid = roomid;
    }
    public getRoomId() {
        return this._roomid;        
    }

    public setIsOwner(isOwner) {
        this._isOwner = isOwner;
    }
    public getIsOwner () {
        return this._isOwner;
    }

    public getState() {
        return this._userState;
    }

    public setState(state: UserSate) {
        this._userState = state;
    }

    public enterRoom() {
        this._userState = UserSate.STATE_ROOM;
    }

    public leaveRoom() {
        this._userState = UserSate.STATE_LOBBY;
    }

}