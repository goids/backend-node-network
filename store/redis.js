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
                res = JSON.stringify(data);
            }

            resolve(res);
        });
    })
}

async function get(table, id){
    // return new Promise( (resolve, reject) => {
    //     client.get(table, (err, data) => {
    //         if(err) reject(err);

    //         let res = data || null;
    //         let filter;

    //         if(data){
    //             filter = data.filter( item => item.id === id)[0] || null;
    //             res = JSON.stringify(filter);
    //         }

    //         resolve(res);
    //     })
    // })
    const collection = await list(table);
    return collection.filter( item => item.id === id)[0] || null;
}

async function upsert(table, body){
    let key = table;
    if(data && data.id){
        key = `${key}_${data.id}`;
    }

    client.setex(key, 10, JSON.stringify(data));
    return true;
}

module.exports = {
    list,
    get,
    upsert
}