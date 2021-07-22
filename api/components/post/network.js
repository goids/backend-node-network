const express = require('express');

const response = require('../../../network/response');
const error = require('../../../network/errors');
const controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', listByID);
router.post('/', addPost);

function list(req, res, next){
    controller.list()
        .then( data => response.success(req, res, data, 200))
        .catch(next)
}

function listByID(req, res, next){
    controller.getPost(req.params.id)
        .then( data  => response.success(req, res, data, 200))
        .catch(next)
}

function addPost(req, res, next){
    controller.add(req.body)
        .then( data => response.success(req, res, data, 200))
        .catch(next)
}

module.exports = router;