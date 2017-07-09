"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./../config");
let pool = null;
function nop(a, b, c, d, e, f, g) {
}
function query(sql, callback) {
    pool.getConnection(function (err, conn) {
    });
}
exports.init = function (config) {
    pool = config_1.mysql.createPool({});
};
