
export interface ip_port {
    ip: string;
    port: number;
}

export let ipConfig: ip_port = {
    ip: "127.0.0.1",
    port: 9300,
}

// 游戏id
export let gameid = 1;

// 游戏开始人数
export let minCount = 2;

// 创建房间需要的房卡数
export let needGems = 1;

// 一轮的总局数
export let totalRound = 10;


