import db = require('../tools/db');

import {mysql} from '../config';

require('../utils/utility');

db.init(mysql());

db.is_account_exsit('chenshao01', function(exist) {
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

db.create_user({account: "chenshao01", nickname: '辰少01', gems: 100}, function(suc) {
	console.log('suc = ' + suc)
})

db.get_user_info('chenshao01', function(user) {
	console.log(user)
})