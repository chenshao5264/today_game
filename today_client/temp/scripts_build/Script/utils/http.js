"use strict";
cc._RF.push(module, '9915b+KKH5M0ZQZypKms2JF', 'http');
// Script/utils/http.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get_http = get_http;
function get_http(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
            var response = xhr.responseText;
            if (cb != null) {
                cb(JSON.parse(response));
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.timeout = 3000;
    xhr.send();
}

cc._RF.pop();