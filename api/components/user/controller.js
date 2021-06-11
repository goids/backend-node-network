const { nanoid } = require('nanoid');

const USER = 'user';

module.exports = function(injectedStore){
    const store = injectedStore;

    if(!store){
        store = require('../../../store/yummi');
    }

    function list(){
        return store.list(USER);
    }

    function get(id){
        return store.get(USER, id)
    }

    function upsert(data){
        const user = {
            name : data
        }

        if(!data.id){
            user.id = nanoid();
        }else{
            user.id = data.id
        }

        return store.upsert(USER, user);
    }

    function put(name){
        return store.put(USER, name)
    }

    function remove(){
        return store.remove(USER);
    }

    return {
        list,
        get,
        upsert,
        remove,
        put,
    }
}