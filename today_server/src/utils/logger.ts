import log4js = require('log4js');

log4js.configure({appenders: [
    {
        type: 'console'
    },
    {
        type: 'file',
        filename: __dirname + '/../../logs/normal.log',
        category: 'normal',
        level: 'TRACE'
    }
    ],
    replaceConsole: true
});

export let logger = log4js.getLogger('normal');

