const mysql = require('mysql');
const config = require('../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let connection;

function connectDB(){
    connection = mysql.createConnection(dbConfig);

    connection.connect( err => {
        if(err){
            console.error('[db err]', err)
            setTimeout( connectDB, 200);
        }else{
            console.log('[db] Connected.....')
        }
    })

    connection.on('error', err => {
        console.error('[db err]', err)

        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            connectDB()
        }else{
            throw err;
        }
    })
}

connectDB();

function list(table){
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if(err) reject(err)

            resolve(data);
        })
    })
}

function get(table, id){
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if(err) reject(err);

            resolve(data);
        })
    })
}

function insert(table, data){
    return new Promise( (resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if(err) reject(err);

            resolve(result);
        })
    })
}

function update(table, data){
    return new Promise( (resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if(err) reject(err)

            resolve(result)
        })
    })
}

async function upsert(table, data){
    let rows = [];

    if(rows.id){
        rows = await get(table, data.id)
    }

    if (rows.length !== 0) {
        return update(table, data);
    } else {
        return insert(table, data);
    }
}

function query(tabla, queryData){
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla} WHERE ?`, queryData, (err, result) => {
            console.error(err)
            if(err) reject(err)
            
            resolve(result[0] || null)
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query
}