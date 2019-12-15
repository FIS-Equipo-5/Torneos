
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./conf/dbConfig.js');
const bodyParser = require('body-parser');



console.log('Setting up API server');


var app = express();
app.use(bodyParser.json());

// Require Transfer routes
require('./app/router/router')(app);

// app.get('/', (req, res) => res.send('<html><body><h1>Welcome to Tournaments microservice!</h1></body></html>'));



// Setting up database
console.log("Setting up database");

mongoose.Promise = global.Promise;

console.log(`Connecting to ${dbConfig.url}!`);

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
