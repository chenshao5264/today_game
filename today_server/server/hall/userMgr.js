

var userSockets = {};
var userOnline = 0;

exports.online = function(userId, socket) {
    userSockets[userId] = socket;
    userOnline++;
}

exports.offline = function(userId) {
    delete userSockets[userId];
    userOnline--;
}

exports.getOnlineCount = function() {
    return userOnline;
}

exports.sendMsg = function(userId, msgdata) {
    var sokcet = userSockets[userId];
    if (socket == null) {
        return;
    }

    socket.emit("message", msgdata);
}

exports.broacast = function() {
    
}