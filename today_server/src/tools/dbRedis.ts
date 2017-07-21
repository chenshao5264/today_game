import redis = require('redis');
import { logger } from '../utils/logger';

let client: redis.RedisClient;

function nop(a, b, c, d, e, f, g) {

}

export let init = function() {
    client = redis.createClient();

    client.on('end', function(err) {
        logger.trace('redis end' + err);
    });

    client.on('error', function(err) {
        logger.trace('redis error' + err);
    });

    return client;
}

export let setKeyExpire = function(key: string, value: number) {
     if (key == null || value == null) {
        return;
    }

    client.expire(key, value);
}

export let set = function(key: string, value: string) {

    if (key == null || value == null) {
        return;
    }

    client.set(key, value, function(err) {
        if (err) {
            logger.error('redis set error11' + err);
        }
    });
}

export let async_get = function(key: string) {
    return new Promise<any>((resolve, reject) => {
        if (key == null) {
            resolve(null);
            return;
        }

        client.get(key, function(err, res) {
            if (err) {
                logger.info('regis get err: ' + err);
            } else {
                resolve(res);
            }        
        });
    });
}

export let get = function(key: string, callback: any) {
    callback =  callback == null ? nop : callback;

    if (key == null) {
        callback(null);
        return;
    }

    client.get(key, function(err, res) {
        if (err) {
            logger.info('regis get err: ' + err);
        } else {
            callback(res);
        }        
    });
}

export let hmset = function(key: string, value: any, callback?: any) {
    callback =  callback == null ? nop : callback;

    if (key == null || value == null) {
        return;
    }

    client.hmset(key, value, function(err) {
        if (err) {
            logger.error('redis hmset error' + err);
        }
    });
}

export let async_hmget = function(key: string) {
    return new Promise<any>((resolve, reject) => {
        if (key == null) {
            resolve(null);
            return;
        }

        client.hgetall(key, function(err, res) {
            if (err) {
                logger.trace('redis hgetall err: ' + err);
            } else {
                resolve(res);
            }
        });
    });
}

export let hmget = function(key: string, callback: any) {
    callback =  callback == null ? nop : callback;

    if (key == null) {
        callback(null);
        return;
    }

    client.hgetall(key, function(err, res) {
        if (err) {
            logger.trace('redis hgetall err: ' + err);
        } else {
            callback(res);
        }
    });
}