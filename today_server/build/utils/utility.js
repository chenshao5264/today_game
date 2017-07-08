"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.address2ip = function (address) {
    if (address.indexOf('::ffff:') != -1) {
        address = address.substr(7);
    }
    return address;
};
