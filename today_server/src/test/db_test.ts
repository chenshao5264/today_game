import db = require('../tools/db');

import {mysql} from '../config';

db.init(mysql());

db.is_account_exit('chenshao01', function(exist) {
    if (exist) {
		console.log("11111");
	} else {
		console.log("2222");
	}
})

db.create_account('chenshao01', 'chb123', function(suc) {
    if (suc) {
		console.log("3333");
	} else {
		console.log("4444");
	}
}) 