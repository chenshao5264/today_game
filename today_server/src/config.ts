export interface sql_config {
    host: string;
    user: string;
    pwd: string;
    db: string;
    port: number;
}

export let mysql = function(): sql_config {
    return {
        host: "127.0.0.1",
        user: "root",
        pwd: "1q2w3e",
        db: "today_game",
        port: 3306,
    };
};

export interface ip_port {
    ip: string;
    port: number;
}

export let login_server = function(): ip_port {
    return {
        ip: "127.0.0.1",
        port: 9100,
    };
}