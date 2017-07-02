var protobuf = require("protobufjs");

cc.Class({
    ctor: function() {
        this._root = null;

    },

    init: function(xProto) {
        var self = this;

        protobuf.load(cc.url.raw("resources/proto/" + xProto + ".proto"), function(err, root) {
            if (err) {
                console.log("err " + err);
                return;
            }
            
            self._root = root;
        })
    },

    getData: function(bufferArray, xMessage) {
        var protoMsg = this._root.lookupType("todaygame." + xMessage);
        
        var msg = protoMsg.decode(bufferArray);

        return msg;
    },

    getBuffer: function(rawMsg, xMessage) {
        var protoMsg = this._root.lookupType("todaygame." + xMessage);

        var errMsg = protoMsg.verify(rawMsg);
        if (errMsg) {
            console.log(errMsg);
            return;
        }

        var msg = protoMsg.create(rawMsg);
        var buffer = protoMsg.encode(msg).finish();
        
        return buffer;
    }

});



