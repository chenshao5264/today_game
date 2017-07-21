export interface SocketIO_Socket extends SocketIO.Socket {
    userid?: number;
    //sign?: string;
}


export interface BaseBody {
    msgid:     number;

    register?:   ReigsterBody;
    login?:      LoginBody;
    lobby?:      LobbyBody;
    room?:       RoomBody;
    selectgame?: SelectGameBody;

    gamelogin?: GameLoginBody;
}

export interface ReigsterBody {
    // req
    account?:  string;
    password?: string;
    nickname?: string;

    // ack
    errcode?:  number;
}

export interface LoginBody {
    // req
    account?:   string;
    password?:  string;
    logintime?: string;


    // ack
    errcode?: number;
    sign?:    string;
    ip?:      string;
    port?:    number;
    userid?:  number;
}

export interface LobbyBody {
    // req
    account?:  string;
    sign?:     string;

    // ack
    errcode?:  number;
    userinfo?: UserBody;
}



export interface RoomBody {
    // req create
    // req enter
    // req leave


    // ack
    errcode?: number;

    // enter req & ack
    roomid?: number;

    // leave ack
    userid?: number;
}

export interface SelectGameBody {
    // req
    userid?:  number;
    gameid?:  number;
    
    // ack
    errcode?: number;
    sign?:    string;
    ip?:      string;
    port?:    number;
}

export interface GameLoginBody {
    userid?:  number;
    
    // req
    account?:  string;
    sign?:     string;

    // ack
    errcode?:  number;
}

export interface AccountBody {
    account?: string;
    password?: string;
}

export interface UserBody {
    userid?:   number;
    account?:  string;
    nickname?: string;
    sex?:      number;
    gems?:     number;
}

