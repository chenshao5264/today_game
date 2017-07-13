
export enum protocol {
    // start login
    P_LOGIN_START     = 0,
    P_CL_REGISTER_REQ = 100,
    P_LC_REGISTER_ACK,
    P_CL_LOGIN_REQ,
    P_LC_LOGIN_ACK,
    P_LOGIN_END       = 499,
    // end login

    P_CL_LOGIN_LOBBY_REQ = 500,
    P_LC_LOGIN_LOBBY_ACK,
}

