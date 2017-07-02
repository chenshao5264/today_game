var mysql = require("mysql");
var crypto = require("../utils/crypto");
var logger = require("../utils/logger");

var pool = null;

function nop(a, b, c, d, e, f, g) {

}

function query(sql, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function(qerr, vals, fields) {
                conn.release();
                callback(qerr, vals, fields);
            }); 
        }
    });
}

exports.init = function(config) {
    pool = mysql.createPool({
        host:     config.host,
        user:     config.user,
        password: config.pwd,
        database: config.db,
        port:     config.port,
    });
}

exports.is_account_exist = function(account, callback) {
    callback =  callback == null ? nop : callback;
    if (account == null) {
        callback(false);
        return;
    }

    var sql = 'select * from t_accounts where account = "' + account + '"';
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(false);
            //throw err;
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

exports.create_account = function(account, password, callback) {
    callback =  callback == null ? nop : callback;
    if (account == null || password == null) {
        callback(false);
        return;
    }

    var pwd = crypto.md5(password);
    var sql = 'insert into t_accounts(account, password) values("' + account + '","' + pwd + '")';
    query(sql, function(err, rows, fields) {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                callback(false);
                return;
            }
            callback(false);
            //throw err;
            logger.error(err);
        } else {
            callback(true);
        }
    });
}

exports.is_user_exist = function(account, callback) {
    callback =  callback == null ? nop : callback;
    if (account == null) {
        callback(false);
        return;
    }

    var sql = 'select userid from t_users where account = "' + account + '"';
    query(sql, function(err, rows, fields) {
        if (err) {
            //throw err;
            logger.error(err);
        }

        if (rows.length == 0) {
            callback(false);
            return;
        }
        
        callback(true);
    });
}

exports.get_account_info = function(account, password, callback) {
    callback =  callback == null ? nop : callback;
    if (account == null || password == null) {
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

        if (password != null) {
            var pwd = crypto.md5(password);
            if (rows[0].password !== pwd) {
                callback(null);
                return;
            }
        }

        callback(rows[0]);
    });
}

exports.get_user_data = function(account, callback) {
    callback = callback == null? nop:callback;
    if(account == null){
        callback(null);
        return;
    }

    var sql = 'SELECT userid,account,name,gems FROM t_users WHERE account = "' + account + '"';
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }

        if(rows.length == 0){
            callback(null);
            return;
        }
        callback(rows[0]);
    });
}

exports.create_user = function(parms, callback) {
    callback = callback == null ? nop : callback;

    var account = parms.account
    var name    = parms.nickname
    var gems    = parms.gems

    var sql = 'INSERT INTO t_users(account,name,gems) VALUES("{0}","{1}",{2})';
    sql = sql.format(account, name, gems);
    query(sql, function(err, rows, fields) {
        if (err) {
            logger.error("重复创建");
        }
        callback(true);
    });
}