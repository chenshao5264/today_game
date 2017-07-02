// var dbHepler    = require("../../helper/dbHelper");
// var configs      = require("../../config");


// dbHepler.init(configs.mysql());

// var loginServer = require("./login_server");
// loginServer.start(configs.login_server());


var socket_service = require("../common/socket_service");
var config = require("../../config").login_server();


var socket_delegate = require("./socket_delegate");
socket_service.start(config, socket_delegate);