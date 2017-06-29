var dbHepler    = require("../../helper/dbHelper");
var configs      = require("../../config");


dbHepler.init(configs.mysql());

var loginServer = require("./login_server");
loginServer.start(configs.login_server());
