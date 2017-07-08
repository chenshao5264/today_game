"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
log4js.configure({ appenders: [
        {
            type: 'console'
        },
        {
            type: 'file',
            filename: 'logs/normal.log',
            category: 'normal',
            level: 'TRACE'
        }
    ],
    replaceConsole: true
});
exports.logger = log4js.getLogger('normal');
