"use strict";
cc._RF.push(module, '6be24x83aFJsLlLILr/VfV/', 'exports_test');
// Script/test/exports_test.js

"use strict";

var count = 1;

exports.a = function () {
    console.log(count);
    count++;
};

exports.b = function () {
    console.log(count);
};

cc._RF.pop();