var http = require("../utils/http");

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

        var nickname = self.ebxNickname.string;
        var account  = self.ebxAccount.string;
        var pwd      = self.ebxPasswrod.string;

        var rawData = {account: account, password: pwd, nickname: nickname}

        cc.gg.loginNetCtrl.sendMsgReq(cc.gg.protocol.CL_REGISTER_REQ, rawData, "RegisterMessage", 
        function(bufferArray)
        {
            
            console.log(bufferArray);
        });

        // var url      = config.HTTP_IP_PORT + "/register?account=" + account + "&password=" + pwd + "&nickname=" + nickname;
        // http.get_http(url, function(res) {
        //     console.log(res);
        //     if (res.errcode == 0) {
        //         self.labelTips.string = "注册成功";
        //     } else if (res.errcode == 1) {
        //         self.labelTips.string = "注册失败,账号重复";
        //     }
        // });
    },

    onBtnLogin: function(event, data) {
        var self = this;

        // self.labelTips.string = "正在登录..."
        
        // var rawData = {account: "chenshao01", password: "chb123", nickname: "辰少01"}
        // var buffer = self._protojs.getBuffer(rawData);
        // this._socket.emit("message", {id: cc.gg.protocol.CL_REGISTER_REQ, buffer: buffer}, 
        //     function(buffer) {
        //         console.log(buffer);
        //     });



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
        cc.gg = cc.gg ? cc.gg : {}

        var NetworkCtrl = require("../net/NetworkCtrl");
        var loginNetCtrl = new NetworkCtrl();
        loginNetCtrl.init("login");
        loginNetCtrl.makeConnect();
        cc.gg.loginNetCtrl = loginNetCtrl;

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
