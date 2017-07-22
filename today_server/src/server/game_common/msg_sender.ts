import { protocol } from '../common/socket_protocol';
import { protobufjs } from '../common/socket_protobufjs';
import { logger } from '../../utils/logger';
import { BaseSender } from '../common/base_sender';
import BodyType = require('../defines/bodys');

export class MsgSender extends BaseSender {
    private static readonly _msgSender: MsgSender = new MsgSender();

    public static getInstance(): MsgSender {
        return this._msgSender;
    }

    private constructor() {
        super();
    }

}