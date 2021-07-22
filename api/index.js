const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const errors = require('../network/errors')

const swaggerDoc = require('./swagger.json');
const config = require('../config');

const user = require('../api/components/user/network');
const auth = require('../api/components/auth/network');
const post = require('../api/components/post/network');

const app = express();

app.use(bodyParser.json());

// ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Middleware Erorrs
app.use(errors)

// LISTEN
app.listen(config.api.port, function(){
    console.log(`API listen on port: ${config.api.port}, http://locahost:${config.api.port}`);
});