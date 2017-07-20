
export enum protocol {
    // start login
    P_LOGIN_START     = 0,
    P_CL_REGISTER_REQ = 100,
    P_LC_REGISTER_ACK,
    P_CL_LOGIN_REQ,
    P_LC_LOGIN_ACK,
    P_LOGIN_END       = 499,
    // end login

    // lobby
    P_LOBBY_START  = 500,
    P_CL_LOBBY_REQ = 500,
    P_LC_LOBBY_ACK,
    P_CL_SELECT_GAME_REQ,
    P_LC_SELECT_GAME_ACK,
    P_CL_CREATE_ROOM_REQ,
    P_LC_CREATE_ROOM_ACK,
    P_CL_ENTER_ROOM_REQ,
    P_LC_ENTER_ROOM_ACK,

    P_CL_LEAVE_ROOM_REQ,
    P_LC_LEAVE_ROOM_NOT,

    P_CL_HAND_UP_REQ,
    P_LC_HAND_UP_ACK,
    P_LC_START_GAME_NOT,
    // lobby
}

