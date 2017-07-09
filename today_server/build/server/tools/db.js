"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
let pool = null;
function nop(a, b, c, d, e, f, g) {
}
function query(sql, callback) {
    pool.getConnection(function (err, conn) {
    });
}
exports.init = function (config) {
    pool = mysql.createPool({});
};
