
function initInstance() {
    cc.gg = cc.gg ? cc.gg : {}
    cc.gg.utils = require("../utils");
    
    cc.gg.protocol = require("../protocol/protocol");


    var MsgHandler = require("../net/MsgHandler");
    //MsgHandler.getInstance().startMsgQueue();
    //
    //
    
    var Protobufjs = require("../net/Protobufjs");
    Protobufjs.load();
}


cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        initInstance()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
