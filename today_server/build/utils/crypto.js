"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
exports.md5 = function (content) {
    let md5 = crypto.createHash('md5');
    md5.update(content);
    return md5.digest('hex');
};
exports.toBase64 = function (content) {
    return new Buffer(content).toString();
};
exports.fromBase64 = function (content) {
    return new Buffer(content, 'base64').toString();
};
