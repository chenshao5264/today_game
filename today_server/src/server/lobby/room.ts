import { User } from './user';

export class Room {
    constructor(roomid: number) {

    }

    // {userid: user}
    private _users: User[] = [];

    private _ownerid: number;

    public getUsers() {
        return this._users;
    }

    public join(user: User) {
        this._users.push(user)
        user.enterRoom();
    }

    public setOwnerId(userid: number) {
        this._ownerid = userid;
    }
}