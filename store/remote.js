const { get } = require('request');
const request = require('request');

function createRemoteDB(host, port){
    const url = `http://${host}:${port}`;

    function list(table){
        return req('GET', table);
    }

    function get(table, id){
        return req('GET', table, id);
    }

    function insert(table, data){
        return req('POST', table, data);
    }

    function update(table, data){
        return req('PUT', table, data);
    }

    function upsert(table, data){
        if(data.id){
            return update(table, data);
        }

        return insert(table, data);
    }

    function query(table, query, join){
        return req('POST', `${table}/query`, { query, join})
    }

    function req(method, table, data){
        let urlRemote = `${url}/${table}`;
        let body = '';

        if(data && method === 'GET'){
            urlRemote = `${url}/${table}/${data}`;
        }else if(data){
            body = JSON.stringify(data);
        }

        return new Promise( (resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url: urlRemote,
                body
            }, function(err, req, body) {
                if(err){
                    console.error('Error con la base de datos remota')
                    reject(err.message)
                }

                const resp = JSON.parse(body);
                resolve(resp.body)
            })
        })
    }

    return {
        list,
        get,
        upsert,
        query,
        query
    }
}

module.exports = createRemoteDB;