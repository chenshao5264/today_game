var express  = require("express");
var crypto   = require("../../utils/crypto");
var dbHelper = require("../../helper/dbHelper");
var logger   = require("../../utils/logger");

var app = express();

function send(res, ret) {
    res.send(JSON.stringify(ret));
}

exports.start = function(cfg) {
    app.listen(cfg.port);
    logger.info("login server start: " + cfg.ip + ": " + cfg.port);
}

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get("/", function(req, res) {
    res.send("Hello world");
});

app.get("/login", function(req, res) {

    logger.debug("login login");

    var account = req.query.account;
    var password = req.query.password;

    if (account == null || password == null) {
        send(res, {errcode: 1, errmsg: "account or passwrod is empty."});
        return;
    }

    dbHelper.get_account_info(account, password, function(info) {
        if (info == null) {
            send(res, {errcode: 1, errmsg: "invalid account or invalid password"});
            return;
        }

        var sign = crypto.md5(account)

        var ret = {
            errcode: 0,
            errmsg: "ok",
            account: account,
            sign: sign,
        }
        send(res, ret);
    });
});

app.get("/register", function(req, res) {
    var account  = req.query.account;
    var password = req.query.password;
    var nickname = req.query.nickname;

    if (account == null || password == null || nickname == null) {
        send(res, {errcode: 1, errmsg: "account or passwrod or nickname is empty."});
        return;
    }

    var fnFailed = function() {
        send(res, {errcode: 1, errmsg: "account has been used."});
    };

    var fnSucceed = function() {
        send(res, {errcode: 0, errmsg: "ok"});
    };

    dbHelper.is_account_exist(account, function(exist) {
        if (!exist) {
            dbHelper.create_account(account, password, function(suc) {
                if (suc) {
                    dbHelper.create_user({account: account, nickname: nickname, gems: 10})
                    fnSucceed();
                } else {
                    fnFailed();
                    logger.error("create account failed.");
                }
            });
        } else {
            fnFailed();
            logger.info("account has benn used.")
        }
    });
});