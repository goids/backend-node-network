const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const user = require('../api/components/user/network');

const app = express();

app.use(bodyParser.json());

// ROUTER
app.use('/api/user', user);


// LISTEN
app.listen(config.api.port, function(){
    console.log(`API listen on port: ${config.api.port}, http://locahost:${config.api.port}`);
});