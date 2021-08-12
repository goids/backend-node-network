const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const posts = require('./components/post/network');
const error = require('../network/errors');

const app = express();
const port = config.posts.port;

app.use(bodyParser.json());

//Routes
app.use('/api/post', posts);
app.use(error);

app.listen(port, function(){
    console.log(`Listen micro-service posts in port ${port}`)
})