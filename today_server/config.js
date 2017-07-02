
exports.mysql = function() {
    return {
        host: "127.0.0.1",
        user: "root",
        pwd: "1q2w3e",
        db: "today_game",
        port: 3306,
    };
}

exports.login_server = function() {
    return {
        client_ip: "127.0.0.1",
        client_port: 9100,
    };
}

exports.hall_server = function() {
    return {
        client_ip: "127.0.0.1",
        client_port: 9101,
    }
}



