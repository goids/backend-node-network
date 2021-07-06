const response = require('./response');

module.exports = function errors(err, req, res, next){
    console.error(`[error], ${err}`);

    const message = err.message || `You don't permiso`;
    const statusCode = err.statusCode || 500;

    response.error(req, res, message, statusCode);
}