import crypto = require('crypto');

export let md5 = function(content: string): string {
    let md5 = crypto.createHash('md5');
    md5.update(content);
    return md5.digest('hex');
}

export let toBase64 = function(content: string): string {
    return new Buffer(content).toString();
}

export let fromBase64 = function(content: string): string {
    return new Buffer(content, 'base64').toString();
}