export interface SocketIO_Socket extends SocketIO.Socket {
    userid?: number;
}

export enum UserSate {
    STATE_NULL = 0,
    STATE_LOGIN,
    STATE_LOBBY,
    STATE_ROOM,
    STATE_GAMING,
}



export interface MsgPacket {
    msgid:   number;

    register?: ReigsterBody;
    login?:    LoginBody;
    lobby?:    LobbyBody;
    room?: RoomBody;
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

    // ack
    errcode?: number;
    roomid?: number;
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

