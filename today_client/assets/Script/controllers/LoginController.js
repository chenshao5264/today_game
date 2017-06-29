var http = require("../utils/http");
var net = require("../net/NetworkCtrl");
var config = require("../config");

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
        labelTips: {
            default: null,
            type: cc.Label
        }
    },

    onBtnRegister: function(event, data) {
        var self = this;
        self.labelTips.string = "正在注册..."

        var account = self.ebxAccount.string;
        var pwd     = self.ebxPasswrod.string;
        var url     = config.HTTP_IP_PORT + "/register?account=" + account + "&password=" + pwd;
        http.get_http(url, function(res) {
            console.log(res);
            if (res.errcode == 0) {
                self.labelTips.string = "注册成功";
            } else if (res.errcode == 1) {
                self.labelTips.string = "注册失败,账号重复";
            }
        });
    },

    onBtnLogin: function(event, data) {
        var self = this;

        self.labelTips.string = "正在登录..."

        //net.makeConnect();

        var account = self.ebxAccount.string;
        var pwd     = self.ebxPasswrod.string;
        var url     = config.HTTP_IP_PORT +  "/login?account=" + account + "&password=" + pwd;

        http.get_http(url, function(res) {
            console.log(res);
            if (Number(res.errcode) == 0) {
                self.labelTips.string = "登陆成功";
                //cc.director.loadScene("HallScene");
                cc.gg.utils.enterScene("HallScene");
            } else if (Number(res.errcode) == 1) {
                self.labelTips.string = "登陆失败,账号或密码错误";
            }
        });
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
