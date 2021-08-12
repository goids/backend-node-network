const redis = require('redis');

const config = require('../config');

const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password
});

function list(table){
    return new Promise( (resolve, reject) => {
        client.get(table, (err, data) => {
            if(err) {
                reject(err);
            }

            let res = data || null;
            if(data){
                res = JSON.parse(data);
            }

            resolve(res);
        });
    })
}

async function get(table, id){
    return list(`${table}_${id}`)
}

async function upsert(table, body){
    let key = table;
    if(body && body.id){
        key = `${key}_${body.id}`;
    }

    client.setex(key, 10, JSON.stringify(body));
    return true;
}

module.exports = {
    list,
    get,
    upsert
}