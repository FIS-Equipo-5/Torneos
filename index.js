
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./conf/dbConfig.js');
const moment = require("moment");
const { httpLogger } = require('./app/utils');
const { logger } = require('./app/utils');
const bodyParser = require('body-parser');


global.BASE_API_PATH = "/api/v1"
console.log('Setting up API server');


var app = express();
app.use(bodyParser.json());


app.use(httpLogger);
app.get('/', (req, res) => res.send('<html><body><h1>Welcome to Tournaments microservice!</h1></body></html>'));
// Require Transfer routes
require('./app/router/')(app);

// app.get('/', (req, res) => res.send('<html><body><h1>Welcome to Tournaments microservice!</h1></body></html>'));



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
        const Tournament = require('./app/models/tournament.js');

        const tournament = new Tournament({
            name: "tournament1",
            type: "clasification",
            endDate: moment(),
            startDate: moment()
        });

        tournament.save().catch((error) => logger.warn("Dummy Tournament already created"))
    });
}).catch(err => {
    logger.error('Could not connect to the database. Exiting now...', err);
    process.exit();
});




const Match = require('./app/models/match.js');

const match = new Match({
    match_id: '1',
    visitorTeamUuid: '1',
    homeTeamUuid: '2',
    matchDate: new Date()
});


match.save().catch((error) => logger.warn("Some fields in the match object are required"));


module.exports = app;