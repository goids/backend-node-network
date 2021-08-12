const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');

const app = express();
const port = config.cache_service.port;

app.use(bodyParser.json());

app.listen(port, function(){
    console.log(`Cache with Redis listen on port ${port}`);
})