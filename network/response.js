exports.success = function(req, res, message, status){
    let codeStatus = status || 200;
    res.status(codeStatus).send({
        error: false,
        status,
        body: message,
    });
};

exports.error = function(req, res, message, status){
    let codeStatus = status || 500;
    let statusMessage = message || 'Iternal server error';

    res.status(codeStatus).send({
        error: statusMessage,
        status,
        body: message,
    });
};