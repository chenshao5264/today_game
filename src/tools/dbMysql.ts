import mysql = require('mysql');
import { md5 } from "../utils/crypto";
import { logger } from '../utils/logger';
import { sql_config } from '../config';

require('../utils/utility');

import BodyType = require('../server/common/define_body');

let pool: mysql.IPool = null;

function nop(a, b, c, d, e, f, g) {

}

function sql_format() {

}

function query(sql, callback) {
    pool.getConnection(function(err: mysql.IError, conn: mysql.IConnection) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function(qerr, values, fields) {
                conn.release();
                callback(qerr, values, fields);
            });
        }
    });
}

export let init = function(config: sql_config) {
    pool = mysql.createPool({
        host:     config.host,
        user:     config.user,
        password: config.pwd,
        database: config.db,
        port:     config.port,
    });

    return pool == null ? false : true;
} 

export let async_is_account_exsit = function(account: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        if (account == null) {
            resolve(false);
            return;
        }

        let sql = 'select * from t_accounts where account = "' + account + '"';
        query(sql, function(err, rows, fields) {
            if (err) {
                resolve(false);
                logger.error(err);
            } else {
                if (rows.length > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    });
}

export let async_create_account = function(account: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        if (account == null || password == null) {
            resolve(false);
            return;
        }

        var pwd = password;
        var sql = 'insert into t_accounts(account, password) values("' + account + '","' + pwd + '")';
        query(sql, function(err, rows, fields) {
            if (err) {
                if (err.code == "ER_DUP_ENTRY") {
                    resolve(false);
                    logger.info('account 已经存在');
                } else {
                    resolve(false);
                }
            } else {
            resolve(true);
            }
        });
    });
}

export let is_account_exsit = function(account: string, callback) {
    callback =  callback == null ? nop : callback;
    if (account == null) {
        callback(false);
        return;
    }

    let sql = 'select * from t_accounts where account = "' + account + '"';
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(false);
            logger.error(err);
        } else {
            if (rows.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        }
    });
}

export let create_account = function(account: string, password: string, callback) {
    callback =  callback == null ? nop : callback;
    if (account == null || password == null) {
        callback(false);
        return;
    }

    var pwd = password;
    var sql = 'insert into t_accounts(account, password) values("' + account + '","' + pwd + '")';
    query(sql, function(err, rows, fields) {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                callback(false);
                logger.info('account 已经存在');
            } else {
                callback(false);
            }
        } else {
           callback(true);
        }
    });
}

export let async_create_user = function(parms: BodyType.UserBody) {
    return new Promise<boolean>((resolve, reject) => {
        let account = parms.account;
        let name = parms.nickname;
        let gems = parms.gems;

        var sql = 'INSERT INTO t_users(account,name,gems) VALUES("{0}","{1}",{2})';
        sql = sql.format(account, name, gems);
        query(sql, function(err, rows, fields) {
            if (err) {
                logger.error(account + " 重复创建");
                resolve(false);
            } else {
                resolve(true);
            }   
        });
    });
}

export let create_user = function(parms: BodyType.UserBody, callback) {
    callback = callback == null ? nop : callback;

    let account = parms.account;
    let name = parms.nickname;
    let gems = parms.gems;

    var sql = 'INSERT INTO t_users(account,name,gems) VALUES("{0}","{1}",{2})';
    sql = sql.format(account, name, gems);
    console.log(sql)
    query(sql, function(err, rows, fields) {
        if (err) {
            logger.error(account + " 重复创建");
            callback(false);
        } else {
            callback(true);
        }   
    });
}

export let async_get_user_info = function(account: string) {
    return new Promise<BodyType.UserBody>((resolve, reject) => {
         if(account == null){
            resolve(null);
            return;
        }

        var sql = 'SELECT * FROM t_users WHERE account = "' + account + '"';
        query(sql, function(err, rows, fields) {
            if (err) {
                logger.error(account + " 查询id失败");
                resolve(null);
            }

            if(rows.length == 0){
                logger.error(account + " 无此账户");
                resolve(null);
                return;
            }
            resolve(rows[0]);
        });
    });
}

export let get_user_info = function(account: string, callback) {
    callback = callback == null ? nop : callback;
    if(account == null){
        callback(null);
        return;
    }

    var sql = 'SELECT userid, account, name, gems FROM t_users WHERE account = "' + account + '"';
    query(sql, function(err, rows, fields) {
        if (err) {
            logger.error(account + " 查询id失败");
            callback(null);
        }

        if(rows.length == 0){
            logger.error(account + " 无此账户");
            callback(null);
            return;
        }
        callback(rows[0]);
    });
}

export let async_get_account_info = function(account: string) {
    return new Promise<BodyType.AccountBody>((resolve, reject) => {
        if (account == null) {
            resolve(null);
            return;
        }

        var sql = 'SELECT * FROM t_accounts WHERE account = "' + account + '"';
        query(sql, function(err, rows, fields) {
            if (err) {
                resolve(null);
                logger.error(err);
            }
            if (rows.length == 0) {
                resolve(null);
                return;
            }
            resolve(rows[0]);
        });
    });
}

export let get_account_info = function(account, callback) {
    callback =  callback == null ? nop : callback;
    if (account == null) {
        callback(null);
        return;
    }

    var sql = 'SELECT * FROM t_accounts WHERE account = "' + account + '"';
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            //throw err;
            logger.error(err);
        }
        if (rows.length == 0) {
            callback(null);
            return;
        }

        callback(rows[0]);
    });
};




