import { login_server } from './../../config';
import { socket_service } from './../common/socket_service';
import { socket_delegate } from './socket_delegate';


socket_service.start(login_server(), socket_delegate);