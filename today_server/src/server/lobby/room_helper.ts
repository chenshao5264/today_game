import { logger } from './../../utils/logger';
import { Room } from '../entities/room';
import { DataHelper } from './data_helper';

export class RoomHelper {
    private static readonly _roomHelper: RoomHelper = new RoomHelper();

    public static getInstance(): RoomHelper {
        return this._roomHelper;
    }

    private constructor() {

    }

    // {roomid: room}
    private _rooms: {[key: number]: Room} = {};

    // 生成房间号
    private generate_roomid(): number {
        while (true) {
            let roomid = Math.floor(Math.random() * 1000000);
            if (!this._rooms[roomid]) {
                return 111111;
               // return roomid;
            } 
        }
    }

    // 创建房间
    public createRoom(userid: number) {
        let user = DataHelper.getInstance().getUserById(userid);

        let roomid = this.generate_roomid();
        let room = Room.create(roomid, userid);

        this._rooms[roomid] = room;

        logger.info('房间创建成功: ' + roomid);

        return roomid;
    }
}