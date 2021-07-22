const express = require('express');

const recure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');
const secure = require('./secure');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.delete('/', remove);
router.put('/', secure('update'), upsert); // En nodeJS los middleware se agregan entre el medio de los aprametros de la funcion
router.post('/follow/:id', secure('follow'), follow);
router.get('/:id/following', listFollows)

function list(req, res, next){
    controller.list()
        .then( data => response.success(req, res, data, 200))
        .catch(next)
};

function get(req, res, next){
    controller.get(req.params.id)
        .then( user => response.success(req, res, user, 200))
        .catch(next);
};

function upsert(req, res, next){
    controller.upsert(req.body)
        .then( data => response.success(req, res, data, 200))
        .catch(next);
};

function remove(req, res, next){
    controller.remove()
        .then( data => response.success(req, res, data, 200))
        .catch(next);
};

function put(req, res, next){
    controller.put(req.body.name)
        .then( data => response.success(req, res, data, 200))
        .catch(next)
};

function follow(req, res, next){
    controller.follow(req.user.id, req.params.id)
        .then( data => response.success(req, res, data, 201))
        .catch(next)
};

function listFollows(req, res, next){
    return controller.getFollows(req.params.id)
        .then( data => response.success(req, res, data, 200))
        .catch(next)
}

module.exports = router;