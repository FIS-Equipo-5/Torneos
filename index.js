require('./db');
require('dotenv').config();

const mongoose = require('mongoose');
const dbConfig = require('./conf/dbConfig.js');


var msg = 'hello world';
console.log('Setting up API server');

var express = require('express');
var port = 3000;
var BASE_API_PATH = '/api/v1/';


var app = express();

app.get('/', (req, res) => res.send('<html><body><h1>My server</h1></body></html>'));



// Setting up database
console.log("Setting up database");

mongoose.Promise = global.Promise;


mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// connectDb.then(async () => {
//     app.listen(process.env.PORT, () =>
//         console.log(`Express App listening on port ${process.env.PORT}!`),
//     );
// });


console.log('Everything ready!');
