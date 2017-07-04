"use strict";
cc._RF.push(module, 'a9ee4GP7l9CA4Urp6RWlJP6', 'LoginController');
// Script/controllers/LoginController.js

"use strict";

var http = require("../utils/http");

cc.Class({
    extends: cc.Component,

    properties: {
        btnRegister: {
            default: null,
            type: cc.Button
        },
        btnLogin: {
            default: null,
            type: cc.Button
        },
        ebxAccount: {
            default: null,
            type: cc.EditBox
        },
        ebxPasswrod: {
            default: null,
            type: cc.EditBox
        },
        labelLoginRet: {
            default: null,
            type: cc.Label
        }
    },

    onBtnRegister: function onBtnRegister(event, data) {
        var self = this;
        self.labelLoginRet.string = "正在注册...";

        var account = self.ebxAccount.string;
        var pwd = self.ebxPasswrod.string;
        var url = "http://localhost:9000/register?account=" + account + "&password=" + pwd;
        http.get_http(url, function (res) {
            console.log(res);
            if (res.errcode == 0) {
                self.labelLoginRet.string = "注册成功";
            } else if (res.errcode == 1) {
                self.labelLoginRet.string = "注册失败,账号重复";
            }
        });
    },

    onBtnLogin: function onBtnLogin(event, data) {
        var self = this;

        self.labelLoginRet.string = "正在登录...";

        var account = self.ebxAccount.string;
        var pwd = self.ebxPasswrod.string;
        var url = "http://localhost:9000/login?account=" + account + "&password=" + pwd;

        http.get_http(url, function (res) {
            console.log(res);
            if (Number(res.errcode) == 0) {
                self.labelLoginRet.string = "登陆成功";
                cc.director.loadScene("HallScene");
            } else if (Number(res.errcode) == 1) {
                self.labelLoginRet.string = "登陆失败,账号或密码错误";
            }
        });
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RF.pop();