require('./db');

const mongoose = require('mongoose');
const dbConfig = require('./conf/dbConfig.js');


console.log('Setting up API server');

var express = require('express');
var BASE_API_PATH = '/api/v1/';


var app = express();

app.get('/', (req, res) => res.send('<html><body><h1>Welcome to Tournaments microservice!</h1></body></html>'));



// Setting up database
console.log("Setting up database");

mongoose.Promise = global.Promise;


mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
    app.listen(dbConfig.port, () =>
        console.log(`Express App listening on port ${dbConfig.port}!`),
    );
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


console.log('Everything ready!');


const Match = require('./app/models/match.js');

const match = new Match({
    match_id: '1',
    visitorTeamUuid: '1',
    homeTeamUuid: '2',
    matchDate: new Date()
});

match.save();