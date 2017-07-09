var http   = require("../utils/http");
var config = require("../config");

var smsg        = require("../net/socket_msg")
var protocol    = require("../net/protocol").protocol;

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
        ebxNickname: {
            default: null,
            type: cc.EditBox
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

        let packet = {}
        packet.msgid = protocol.P_CL_REGISTER_REQ;

        let body = {}
        body.nickname = self.ebxNickname.string;
        body.account  = self.ebxAccount.string;
        body.pwd      = self.ebxPasswrod.string;
        packet.register   = body;

        smsg.on(protocol.P_LC_REGISTER_ACK, function(data) {
            let body = data.register;
            if (body.errcode == 0) {
                self.labelTips.string = "注册成功";
            }
        });
        smsg.send(packet);
    },

    onBtnLogin: function(event, data) {
        var self = this;

        smsg.closeSocket("login");

        // self.labelTips.string = "正在登录..."
        
        // var account = self.ebxAccount.string;
        // var pwd     = self.ebxPasswrod.string;
        // var url     = config.HTTP_IP_PORT +  "/login?account=" + account + "&password=" + pwd;

        // http.get_http(url, function(res) {
        //     console.log(res);
        //     if (Number(res.errcode) == 0) {
        //         self.labelTips.string = "登陆成功";

        //         net.makeConnect(function() {
        //             cc.gg.utils.enterScene("HallScene");
        //         });
                
        //     } else if (Number(res.errcode) == 1) {
        //         self.labelTips.string = "登陆失败,账号或密码错误";
        //     }
        // });
    },

    // use this for initialization
    onLoad: function () {

        smsg.connectLoginServer();

        // var NetworkCtrl = require("../net/NetworkCtrl");
        // var loginNetCtrl = new NetworkCtrl();
        // loginNetCtrl.init("login");
        // loginNetCtrl.makeConnect();
        // cc.gg.loginNetCtrl = loginNetCtrl;
        // 

        //Protobufjs.load()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
