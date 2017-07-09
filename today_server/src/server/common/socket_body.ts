export interface MsgPacket {
    msgid: number;

    register?: ReigsterBody;
    login?: LoginBody;
}

export interface ReigsterBody {
    errcode?: number;
    account?:  string;
    password?: string;
    nickname?: string;
}

export interface LoginBody {
    errcode?: number;
    account?:  string;
    password?: string;
}