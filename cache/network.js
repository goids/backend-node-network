const express = require('express');

const response = require('../network/response');
const store = require('../store/redis');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.put('/:table', upsert);

async function list(req, res, next){
    const data = await store.list(req.params.table);
    console.log(data);
    response.success(req, res, data, 200);
}

async function get(req, res, next){
    const data = await store.get(req.params.table, req.params.id);
    response.success(req, res, data, 200);
}

async function upsert(req, res, next){
    const data = await store.upsert(req.params.table, req.body);
    response.success(req, res, data, 200);
}

module.exports = router;
