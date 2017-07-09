"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const crypto_1 = require("../../utils/crypto");
const logger_1 = require("../utils/logger");
let pool = null;
function nop(a, b, c, d, e, f, g) {
}
function query(sql, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        }
        else {
            conn.query(sql, function (qerr, values, fields) {
                conn.release();
                callback(qerr, values, fields);
            });
        }
    });
}
exports.init = function (config) {
    pool = mysql.createPool({
        host: config.host,
        user: config.user,
        password: config.pwd,
        database: config.db,
        port: config.port,
    });
};
exports.is_account_exit = function (account, callback) {
    callback = callback == null ? nop : callback;
    if (account == null) {
        callback(false);
        return;
    }
    let sql = 'select * from t_accounts where account = "' + account + '"';
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(false);
            logger_1.logger.error(err);
        }
        else {
            if (rows.length > 0) {
                callback(true);
            }
            else {
                callback(false);
            }
        }
    });
};
exports.create_account = function (account, password, callback) {
    callback = callback == null ? nop : callback;
    if (account == null || password == null) {
        callback(false);
        return;
    }
    var pwd = crypto_1.md5(password);
    var sql = 'insert into t_accounts(account, password) values("' + account + '","' + pwd + '")';
    query(sql, function (err, rows, fields) {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                callback(false);
                logger_1.logger.info('account 已经存在');
            }
            else {
                callback(false);
            }
        }
        else {
            callback(true);
        }
    });
};
