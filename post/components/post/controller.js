const {customAlphabet} = require('nanoid')

const POST = 'post';

module.exports = function(injectedStore){
    const store = injectedStore;

    //Generar Id con numeros
    const alphabet = '0123456789';
    const nanoid = customAlphabet(alphabet, 10);

    if(!store){
        store = require('../../../store/mysql');
    }

    function list(){
        return store.list(POST);
    }

    function getPost(id){
        return store.get(POST, id)
    }

    function add(body){
        const post = {
            text: body.text,
            user: body.user
        }

        if(!body.id){
            post.id = nanoid();
        }else{
            post.id = body.id;
        }

        return store.upsert(POST, post)
    }

    // crear funciones para añadir un post, obtener un post por id y si quieres editarlo tambien

    return {
        list,
        getPost,
        add,
    }
}