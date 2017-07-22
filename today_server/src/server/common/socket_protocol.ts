export enum protocol {
    // start login
    P_CL_REGISTER_REQ = 1000,
    P_LC_REGISTER_ACK,
    P_CL_LOGIN_REQ,
    P_LC_LOGIN_ACK,
    // end login

    // lobby
    P_CS_LOGIN_REQ = 2000,
    P_SC_LOGIN_ACK,

    P_CS_SELECT_GAME_REQ,
    P_SC_SELECT_GAME_ACK,
    // lobby

    // game
    P_CG_LOGIN_REQ = 3000,
    P_GC_LOGIN_ACK,
    P_CG_CREATE_ROOM_REQ,
    P_GC_CREATE_ROOM_ACK,
    P_CG_ENTER_ROOM_REQ,
    P_GC_ENTER_ROOM_ACK,
    P_CG_LEAVE_ROOM_REQ,
    P_GC_LEAVE_ROOM_ACK,
    P_GC_LEAVE_ROOM_NOT,
    P_GC_DISSOLVE_ROOM_NOT,
    // game

    // mini
    P_CG_HAND_UP_REQ = 4000,
    P_GC_HAND_UP_ACK,
    P_GC_HAND_UP_NOT,
    // mini
}

