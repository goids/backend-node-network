const jwt = require('jsonwebtoken');
const config = require('../config');

const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data){
    let jsonData = JSON.parse(JSON.stringify(data))
    return jwt.sign(jsonData, secret);
}

function verify(token){
    return jwt.verify(token, secret);
}

const check = {
    own: function(request, owner){
        const decoded = getHeaders(request);
        console.log(decoded);
        // Comprobar que es el usuario por ID
        if(decoded.id !== owner){
            // Mandar errores con la instancia a un nuevo error
            // throw new Error('Error Forbidden')
            // Errores personalizados
            throw error('Error Forbidden', 401);
        }
    },
    logged: function(request){
        const decoded = getHeaders(request);
        console.log(decoded)
    }
}

function getHeaders(request){
    const authotization = request.headers.authorization || '';
    const token = getToken(authotization);
    const decode = verify(token);

    request.user = decode;
    return decode;
}

function getToken(authotization){
    if(!authotization){
        // throw new Error('Invalid Token');
        throw error('Invalid Token', 401);
    }

    if(authotization.indexOf('Bearer ') === -1){
        // throw new Error('Invalidad Data Token');
        throw error('Invalidad Data Token', 401);
    }

    const cleanToken = authotization.replace('Bearer ', '');

    return cleanToken;
}

module.exports = {
    sign,
    check,
}