const { customAlphabet } = require('nanoid');

const auth = require('../auth');

const USER = 'user';

module.exports = function(injectedStore, injectedCache){
    const store = injectedStore;
    const cache = injectedCache;

    // Generar ID solamente numericos
    const alphabet = '0123456789';
    const nanoid = customAlphabet(alphabet, 10);

    if(!store){
        store = require('../../../store/mysql');
    }

    if(!cache){
        cache = require('../../../store/mysql')
    }

    async function list(){
        let users = await cache.list(USER);

        if(!users){
            console.log('No estaba en cache, buscando en la base de datos')
            users = await store.list(USER);
            cache.upsert(USER, users);
        }else{
            console.log('Traemos los datos de la cache');
        }

        return users;
    }

    async function get(id){
        let user = await cache.list(USER, id);

        if(!user){
            console.log('No estaba en cache, buscando en la base de datos')
            user = await store.get(USER, id);
            cache.upsert(USER, user);
        }

        return user;
    }

    async function upsert(data){
        const user = {
            name : data.name,
            username: data.username
        }

        if(!data.id){
            user.id = nanoid();
        }else{
            user.id = data.id
        }

        if(data.password || data.username){
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: data.password
            })
        }

        return store.upsert(USER, user);
    }

    function put(name){
        return store.put(USER, name)
    }

    function remove(){
        return store.remove(USER);
    }

    function follow(from, to){
        const follow = {
            user_from: from,
            user_to: to,
        }
        return store.upsert(`${USER}_follow`, follow)
    }

    async function getFollows(userID){
        const join = {};
        join[USER]  = 'user_to';
        const query = { user_from: userID };

        return await store.query(`${USER}_follow`, query, join);
    }

    return {
        list,
        get,
        upsert,
        remove,
        put,
        follow,
        getFollows
    }
}