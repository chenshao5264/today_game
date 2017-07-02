module.exports = (function() {
    var instance = null;

    function getInstance() {
        if (instance == null) {
            instance = new ctor();
        }
        return instance;
    }

    function destoryInstance() {
        if (instance) {
            instance.clearQueue();
            instance = null;
        }
    }

    function ctor() {
        var msgQueue = [];
        var cbAcks = {};

        function startMsgQueue() {
            setInterval(function() {
                if (msgQueue.length() > 0) {
                    var msgdata = msgQueue.shift();
                    var msgId = msgdata.id;

                    var buffer = msgdata.buffer;
                    var bufferArray = Object.keys(buffer).map(function(k) {
                        return buffer[k];
                    });

                    // 注册回调函数的执行回调函数
                    if (cbAcks[msgId]) {
                        cbAcks[msgId](bufferArray);
                        cbAcks[msgId] = null;
                    } else {
        
                    }

                    
                }  
            }, 1000);
        }

        return {
            startMsgQueue: startMsgQueue,
            pushMsg: function(msg) {
                msgQueue.push(msg);
            },
            clearQueue: function() {
                msgQueue = [];
            },
            on: function(id, cbAck) {
                cbAcks[id] = cbAck;
            },
            off: function(id) {
                cbAcks[id] = null;
            }
        }
    }

    return {
        getInstance: getInstance,
        destoryInstance: destoryInstance
    } 
})();