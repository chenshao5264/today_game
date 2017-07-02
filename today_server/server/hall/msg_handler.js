var logger     = require("../../utils/logger");
var dbHelper   = require("../../helper/dbHelper");
var crypto     = require("../../utils/crypto");
var protobufjs = require("protobufjs");


var protoLogin = protobufjs.loadSync("../../protocol/login.proto");
var protMsg    = protoLogin.lookup("todaygame.RegisterMessage");

function sendMsgAck(socket, errcode, msg) {
    msg.errcode = errcode
    socket.emit("message", msg)
}


exports.handleLoginReq = function(socket, bufferArray) {

    var msg = protMsg.decode(bufferArray);

    var account = data.account;
    var sign    = data.sign;

    if (sign != crypto.md5(account)) {
        sendMsgAck(socket, 1, {errmsg: "invalid sigin"});
        return;
    }

    dbHelper.get_user_data(account, function(data) {
        if (data == null) {
            sendMsgAck(socket, 1, {errmsg: "invalid account"});
            return;
        }

        var ret = {
            account: data.account,
            userid: data.userid,
            nickname: data.name,
            gems: data.gems,
        }

        sendMsgAck(socket, 0);
    })

}