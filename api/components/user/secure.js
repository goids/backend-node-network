const auth = require('../../../auth')

module.exports = function checkAuth(action){
    
    function middleware(request, response, next){
        switch(action){
            case 'update':
                const owner = request.body.id;
                auth.check.own(request, owner);
                next();
                break;

            case 'follow':
                auth.check.logged(request);
                next();
                break;

            default:
                next();
        }
    }

    return middleware
}