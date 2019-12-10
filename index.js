var msg = 'hello world';
console.log('Setting up API server');

var express = require('express');
var port = 3000;
var BASE_API_PATH = '/api/v1/';


var app = express();

app.get('/', (req, res) => res.send('<html><body><h1>My server</h1></body></html>'));
app.listen(port, () => console.log(`Express App listening on port ${port}!`));


console.log('Everything ready!');
