export interface sql_config {
    host: string;
    user: string;
    pwd: string;
    db: string;
    port: number;
}

export let mysql_config = function(): sql_config {
    return {
        host: "127.0.0.1",
        user: "root",
        pwd: "1q2w3e",
        db: "today_game",
        port: 3306,
    };
};

export let loginConfig = require('../server/login/config').ipConfig;
export let lobbyConfig = require('../server/lobby/config').ipConfig;

export let mini_game_config = function(gameid) {
    if (gameid == 1) {
        return {
            ip: '127.0.0.1',
            port: 9300,
        }
    }
}

