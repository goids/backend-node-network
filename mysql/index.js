const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const network = require('./network');

const app = express();
const port = config.mysql_service.port;

app.use(bodyParser.json());

// Routes
app.use('/', network);

app.listen(port, () => {
    console.log(`Database liste on port ${port}`);
})