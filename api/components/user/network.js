const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.delete('/', remove);
router.put('/', put);

function list(req, res){
    controller.list()
        .then( data => response.success(req, res, data, 200))
        .catch( error => response.error(req, res, error.message, 500))
};

function get(req, res){
    controller.get(req.params.id)
        .then( user => response.success(req, res, user, 200))
        .catch( error => response.error(req, res, error.message, 500));
};

function upsert(req, res){
    controller.upsert(req.body.name)
        .then( data => response.success(req, res, data, 200))
        .catch( error => response.error(req, res, error.message, 500));
};

function remove(req, res){
    controller.remove()
        .then( data => response.success(req, res, data, 200))
        .catch( error => response.error(req, res, error.message, 500));
};

function put(req, res){
    controller.put(req.body.name)
        .then( data => response.success(req, res, data, 200))
        .catch( e => response.error(req, res, e.message, 500))
};

module.exports = router;