const db = {
    'user': [
        {
            id: String(12345),
            name: 'Goide :)'
        }
    ]
};

async function list(tabla){
    return db[tabla] || [];
}

async function get(tabla,id){
    const collection = await list(tabla);
    return collection.filter( item => item.id === id)[0] || null;
}

async function upsert(tabla, data){
    if(!db[tabla]){
        db[tabla] = [];
    }

    db[tabla].push(data);
    //console.log(db)
}

async function put(tabla, data){
    db[tabla][1].name = data;
}

async function remove(tabla){
    return true;
}

async function query(tabla, queryData){
    const col = await list(tabla);
    const keys = Object.keys(queryData);
    const key = keys[0];
    
    return col.filter( item => item[key] === queryData[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    put,
    query,
}