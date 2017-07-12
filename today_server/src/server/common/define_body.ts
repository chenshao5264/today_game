export interface MsgPacket {
    msgid: number;

    register?: ReigsterBody;
    login?:    LoginBody;
}

export interface ReigsterBody {
    errcode?:  number;
    account?:  string;
    password?: string;
    nickname?: string;
}

export interface LoginBody {
    errcode?:  number;
    account?:  string;
    password?: string;
}

export interface AccountBody {
    account?: string;
    password?: string;
}

export interface UserBody {
    account?:  string;
    nickname?: string;
    gems?:     number;
}