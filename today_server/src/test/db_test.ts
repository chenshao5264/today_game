import db = require('../tools/dbMySql');

import { mysql_config } from './../config';

require('../utils/utility');

db.init(mysql_config());

db.async_update_user_value(33, 'gems', 200);

// db.is_account_exsit('chenshao01', function(exist) {
//     if (exist) {
// 		console.log("11111");
// 	} else {
// 		console.log("2222");
// 	}
// })

// db.create_account('chenshao01', 'chb123', function(suc) {
//     if (suc) {
// 		console.log("3333");
// 	} else {
// 		console.log("4444");
// 	}
// }) 

// db.create_user({account: "chenshao01", nickname: '辰少01', gems: 100}, function(suc) {
// 	console.log('suc = ' + suc)
// })

// db.get_user_info('chenshao01', function(user) {
// 	console.log(user)
// })