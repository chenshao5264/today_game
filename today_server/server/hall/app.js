var socket_service = require("./socket_service");


var config = require("../../config").hall_server();


var socket_delegate = require("./socket_delegate");
socket_service.start(config, socket_delegate);