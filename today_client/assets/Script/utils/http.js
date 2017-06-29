
export function get_http (url, cb) {
    console.log("send http req");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = xhr.responseText;
            if (cb != null) {
                cb(JSON.parse(response));
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.timeout = 5000;
    xhr.send();
}

