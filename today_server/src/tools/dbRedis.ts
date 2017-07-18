import redis = require('redis');
import { logger } from '../utils/logger';

let client: redis.RedisClient;

function nop(a, b, c, d, e, f, g) {

}

let close = function() {
    // if (client.connected) {
    //     client.quit();
    // } 
}

export let run = function() {
    client = redis.createClient();

    client.on('end', function(err) {
        logger.trace('redis end');
    });

    client.on('error', function(err) {
        logger.trace('redis error');
    });

    return client;
}

export let setKeyExpire = function(key: string, value: number) {
     if (key == null || value == null) {
        return;
    }

    client.expire(key, value);
}

export let set = function(key: string, value: string, callback?: any) {
    callback =  callback == null ? nop : callback;

    if (key == null || value == null) {
        return;
    }

    if (!client.connected) {
        run();
    } 

    client.set(key, value, function(err) {
        if (err) {
            logger.error('redis set error11' + err);
        }
        close();
    });
}

export let async_get = function(key: string) {
    return new Promise<any>((resolve, reject) => {
        if (key == null) {
            resolve(null);
            return;
        }

        if (!client.connected) {
            run();
        } 

        client.get(key, function(err, res) {
            if (err) {
                logger.info('regis get err: ' + err);
            } else {
                resolve(res);
            }        
            close();
        });
    });
}

export let get = function(key: string, callback: any) {
    callback =  callback == null ? nop : callback;

    if (key == null) {
        callback(null);
        return;
    }

    if (!client.connected) {
        run();
    } 

    client.get(key, function(err, res) {
        if (err) {
            logger.info('regis get err: ' + err);
        } else {
            callback(res);
        }        
        close();
    });

    
}

export let hmset = function(key: string, value: any, callback?: any) {
    callback =  callback == null ? nop : callback;

    if (key == null || value == null) {
        return;
    }

    if (!client.connected) {
        run();
    } 

    client.hmset(key, value, function(err) {
        if (err) {
            logger.error('redis hmset error' + err);
        }
        close();
    });

    
}

export let async_hmget = function(key: string) {
    return new Promise<any>((resolve, reject) => {
        if (key == null) {
            resolve(null);
            return;
        }

        if (!client.connected) {
            run();
        } 

        client.hgetall(key, function(err, res) {
            if (err) {
                logger.trace('redis hgetall err: ' + err);
            } else {
                resolve(res);
            }
             close();
        });

       
    });
}

export let hmget = function(key: string, callback: any) {
    callback =  callback == null ? nop : callback;

    if (key == null) {
        callback(null);
        return;
    }

    if (!client.connected) {
        run();
    } 

    client.hgetall(key, function(err, res) {
        if (err) {
            logger.trace('redis hgetall err: ' + err);
        } else {
            callback(res);
        }
        close();
    });

    
}