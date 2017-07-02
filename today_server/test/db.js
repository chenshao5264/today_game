var dbHelper = require("../helper/dbHelper");
var configs      = require("../config");

dbHelper.init(configs.mysql());




dbHelper.is_account_exist("chenshao001", function(exist) {
	if (exist) {
		console.log("11111");
	} else {
		console.log("2222");
	}
})

dbHelper.create_account("chenshao001", "chb123", function(suc) {
	if (suc) {
		console.log("3333");
	} else {
		console.log("4444");
	}
});


dbHelper.create_user({account: "chenshao01", nickname: "辰少01", gems: 10}, function() {

});