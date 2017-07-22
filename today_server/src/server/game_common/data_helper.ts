import { logger } from './../../utils/logger';
import { Room } from '../entities/room';
import { User } from '../entities/user';
import dbMysql = require('../../tools/dbMysql');
import BodyType = require('../defines/bodys');

export class DataHelper {
    private static readonly _dataHelper: DataHelper = new DataHelper();

    public static getInstance(): DataHelper {
        return this._dataHelper;
    }

    private constructor() {

    }

    //private _sockets: {[key: number]: BodyType.SocketIO_Socket} = {} // {userid: socket}
    private _users: {[key: number]: User} = {}; // {userid: user}

    // 实例化用户 并加入到_users
    public async appendUser(account: string, socket: BodyType.SocketIO_Socket) {

        let userinfo = await dbMysql.async_get_user_info(account);
        let user = User.create(userinfo);
        user.socket = socket;

        this._users[userinfo.userid] = user;
    }

    // 删除user
    public delUser(userid: number) {
        delete this._users[userid];
    }


    public getUserById(userid: number) {
        return this._users[userid];
    }
}