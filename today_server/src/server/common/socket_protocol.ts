
export let protocol = {
    LOGIN_START:     0,
    CL_REGISTER_REQ: 100,
    LC_REGISTER_ACK: 101,
    CL_LOGIN_REQ:    102,
    LC_LOGIN_ACK:    103,
    LOGIN_END:       500
}

export let msgid2proto: {[key: number]: string} = {
    [protocol.CL_REGISTER_REQ]: 'login.register',
    [protocol.LC_REGISTER_ACK]: 'login.register'
}

// 收到的网络包
export interface NetPackage {
    msgid:  number,
    buffer: any,
}