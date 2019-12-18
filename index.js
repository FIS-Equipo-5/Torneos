
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./conf/dbConfig.js');
const { httpLogger } = require('./app/utils');
const { logger } = require('./app/utils');
const bodyParser = require('body-parser');


global.BASE_API_PATH = "/api/v1"
console.log('Setting up API server');


var app = express();
app.use(bodyParser.json());


app.use(httpLogger);
app.get('/', (req, res) => res.send('<html><body><h1>Welcome to Tournaments microservice!</h1></body></html>'));

// Require routes routes
require('./app/router/')(app);

// Setting up database
logger.info("Setting up database");

mongoose.Promise = global.Promise;

logger.info(`Connecting to ${dbConfig.url}!`);

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    logger.info("Successfully connected to the database")
    app.listen(dbConfig.port, () => {
        logger.info(`Express App listening on port ${dbConfig.port}!`)
        require('./app/services/populate.js').populate();
    });
}).catch(err => {
    logger.error('Could not connect to the database. Exiting now...', err);
    process.exit();
});





