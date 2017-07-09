import { login_server } from './../../config';
import { SocketService } from './../common/socket_service';
import { socket_delegate } from './socket_delegate';

let socketService = new SocketService(login_server(), socket_delegate);
socketService.start();
