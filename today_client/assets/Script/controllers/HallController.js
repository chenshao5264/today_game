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

    onBtnCreateRoom: function(event, data) {
        console.log("create room");
        //cc.director.loadScene("GameScene");
        cc.gg.utils.enterScene("GameScene");
    },

    onBtnJoinRoom: function(event, data) {
        console.log("join room");
       // cc.director.loadScene("GameScene");
       cc.gg.utils.enterScene("GameScene");
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
