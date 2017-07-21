import { logger } from './../../utils/logger';

import dbMysql = require('./dbMysql');
import dbRedis = require('./dbRedis');

import { mysql_config } from './../config';

export class DBHelper {
    private static readonly _dbHelper: DBHelper = new DBHelper();

    public static getInstance(): DBHelper {
        return this._dbHelper;
    }

    private constructor() {

    }

    public init() {
        dbMysql.init(mysql_config());
        dbRedis.init()
    }

    public async getUserInfo(userid: number) {
        let userinfo = await dbRedis.async_hmget('userid:' + userid)
        if (userinfo) {

        } else {

        }
    }
}

