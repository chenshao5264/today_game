"use strict";
cc._RF.push(module, '80c06H9qOxKvKZT6X/INAJM', 'HallController');
// Script/controllers/HallController.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        btnCreateRoom: {
            default: null,
            type: cc.Button
        },
        btnJoinRoom: {
            default: null,
            type: cc.Button
        },
        ebxRoomId: {
            default: null,
            type: cc.EditBox
        },
        labelTips: {
            default: null,
            type: cc.Label
        }
    },

    onBtnCreateRoom: function onBtnCreateRoom(event, data) {
        console.log("create room");
        //cc.director.loadScene("GameScene");
        cc.gg.utils.enterScene("GameScene");
    },

    onBtnJoinRoom: function onBtnJoinRoom(event, data) {
        console.log("join room");
        // cc.director.loadScene("GameScene");
        cc.gg.utils.enterScene("GameScene");
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RF.pop();