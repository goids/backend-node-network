const { customAlphabet } = require('nanoid');

const auth = require('../auth');

const USER = 'user';

module.exports = function(injectedStore){
    const store = injectedStore;

    // Generar ID solamente numericos
    const alphabet = '0123456789';
    const nanoid = customAlphabet(alphabet, 10);

    if(!store){
        store = require('../../../store/mysql');
    }

    function list(){
        return store.list(USER);
    }

    function get(id){
        return store.get(USER, id)
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

    return {
        list,
        get,
        upsert,
        remove,
        put,
        follow,
    }
}