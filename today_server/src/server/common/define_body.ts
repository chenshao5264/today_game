export interface SocketIO_Socket extends SocketIO.Socket {
    userid?: number;
}


export interface BaseBody {
    msgid:     number;

    register?:  ReigsterBody;
    login?:     LoginBody;
    lobby?:     LobbyBody;
    room?:      RoomBody;
    gamestart?: GameStartBody;
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
    account?:  string;
    password?: string;

    // ack
    errcode?: number;
    sign?:    string;
    ip?:      string;
    port?:    number;
    user?:    UserBody;
}

export interface LobbyBody {
    // req
    userid?:   number;
    sign?:    string;

    // ack
    errcode?: number;
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

export interface GameStartBody {
    //

    // notify
    
}

export interface AccountBody {
    account?: string;
    password?: string;
}

export interface UserBody {
    userid?:   number;
    account?:  string;
    nickname?: string;
    gems?:     number;
}

