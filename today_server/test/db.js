var dbHepler = require("../../helper/dbHelper");

dbHepler.is_account_exist("chenshao001", function(exist) {
	if (exist) {
		console.log("11111");
	} else {
		console.log("2222");
	}
})

dbHepler.create_account("chenshao001", "chb123", function(suc) {
	if (suc) {
		console.log("3333");
	} else {
		console.log("4444");
	}
});
