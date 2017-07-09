import mysql = require('mysql');
import { md5 } from "../../utils/crypto";
import { logger } from '../utils/logger';
import { sql_config } from '../config';

let pool: mysql.IPool = null;

function nop(a, b, c, d, e, f, g) {

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
} 

export let is_account_exit = function(account: string, callback) {
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

    var pwd = md5(password);
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




