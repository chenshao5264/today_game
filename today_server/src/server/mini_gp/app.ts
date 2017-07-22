import { SocketDelegate } from '../common/socket_delegate';
import { SocketService } from './../common/socket_service';
import { MsgHandler } from './msg_handler';
import { DBHelper } from '../../tools/dbHelper';
import { RoomHelper } from '../game_common/room_helper';

import config = require('./config');

DBHelper.getInstance().init();



let socket_delegate = new SocketDelegate(MsgHandler);
let socketService = new SocketService(config.ipConfig, socket_delegate);
socketService.start();


RoomHelper.getInstance().gameid     = config.gameid;
RoomHelper.getInstance().minCount   = config.minCount;
RoomHelper.getInstance().needGems   = config.needGems;
RoomHelper.getInstance().totalRound = config.totalRound;