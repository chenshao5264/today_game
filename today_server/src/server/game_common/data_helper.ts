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

    private _users: {[key: number]: User} = {}; // {userid: user}

    // 实例化用户 并加入到_users
    public async appendUser(account: string) {

        let userinfo = await dbMysql.async_get_user_info(account);
        let user = User.create(userinfo);

        this._users[userinfo.userid] = user;
    }

    public getUserById(userid: number) {
        return this._users[userid];
    }
}