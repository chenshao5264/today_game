import { protocol } from '../common/socket_protocol';
import { logger } from '../../utils/logger';
import { protobufjs } from '../common/socket_protobufjs';
import { address2ip } from './../../utils/utility';
import { md5 } from '../../utils/crypto';
import { UserSate } from '../defines/enums';

import BodyType = require('../defines/bodys');
import dbRedis = require('../../tools/dbRedis');

import { sendMsgAck } from '../common/socket_msg';

import commonMsgHandler = require('../game_common/msg_handler');


export let MsgHandler = commonMsgHandler.MsgHandler;




