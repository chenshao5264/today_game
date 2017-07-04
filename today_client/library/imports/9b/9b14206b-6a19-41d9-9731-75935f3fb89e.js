"use strict";
cc._RF.push(module, '9b142BrahlB2ZcxdZNfP7ie', 'AppStart');
// Script/components/AppStart.js

"use strict";

function initInstance() {
    cc.gg = cc.gg ? cc.gg : {};
    cc.gg.utils = require("../utils");

    var protobufjs = require("../net/socket_protobufjs");
    protobufjs.load();
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
    onLoad: function onLoad() {
        initInstance();
    }

});

cc._RF.pop();