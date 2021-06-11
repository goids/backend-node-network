const db = {
    'user': [
        {
            id: String(12345),
            name: 'Goide :)'
        }
    ]
};

async function list(tabla){
    return db[tabla];
}

async function get(tabla,id){
    const collection = await list(tabla);
    return collection.filter( item => item.id === id)[0] || null;
}

async function upsert(tabla, data){
    db[tabla].push(data);
    console.log(db)
}

async function put(tabla, data){
    db[tabla].name = data;
}

async function remove(tabla){
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    put,
}