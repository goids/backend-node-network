const bcrypt = require('bcryptjs');

const auth = require('../../../auth/');

const TABLA = 'auth';

module.exports = function(injectedDataBase) {
    const store = injectedDataBase;

    if(!store){
        store = require('../../../store/mysql');
    }

    async function upsert(data){
        const authData = {
            id: data.id
        }

        if(data.username){
            authData.username = data.username;
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLA, authData);
    }

    async function login(username, password){
        const data = await store.query(TABLA, { username });
        
        return bcrypt.compare(password, data.password)
            .then( equal => {
                if(equal === true){
                    const jsonData = JSON.parse(JSON.stringify(data));
                    return auth.sign(jsonData);
                    // return data;
                }else{
                    throw new Error('Data no valid')
                }
            })      
    }

    return {
        upsert,
        login,
    }
}