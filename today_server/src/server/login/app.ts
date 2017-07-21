import { SocketDelegate } from '../common/socket_delegate';
import { SocketService } from './../common/socket_service';
import { MsgHandler } from './msg_handler';
import { ipConfig } from './config';

import { DBHelper } from '../../tools/dbHelper';

DBHelper.getInstance().init();

let socket_delegate = new SocketDelegate(MsgHandler);
let socketService = new SocketService(ipConfig, socket_delegate);
socketService.start();
