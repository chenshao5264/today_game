var log4js = require("log4js")

log4js.configure({
    appenders: [
    {
        type: 'console' // 控制台输出
    }
    ,
    {
        type: 'file', //文件输出
        filename: 'logs/normal.log', 
        category: 'normal' 
    }
    ],
    replaceConsole: true // 替换 console.log
});

var logger = log4js.getLogger("normal");
logger.setLevel("TRACE");

module.exports = logger
