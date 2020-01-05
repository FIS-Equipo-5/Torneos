
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./conf/dbConfig.js');
const { httpLogger } = require('./app/utils');
const { logger } = require('./app/utils');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');



global.BASE_API_PATH = "/api/v1"
console.log('Setting up API server');


var app = express();
app.use(bodyParser.json());

app.set('secretKey', 'authServiceApi'); // jwt secret token


//Function that validates jwt token
let validateUser = (req, res, next) => {
    //console.log(req.path)
    if (req.path.includes('api-docs')){
        next();
        return
    }
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.json({ status: "error", message: err.message, data: null });
        } else {
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });
}
//jwt token is checked for all our routes
app.use('/', validateUser);
app.use(httpLogger);

// Require routes routes
require('./app/router/')(app);

// Setting up database
logger.info("Setting up database");

mongoose.Promise = global.Promise;

logger.info(`Connecting to ${dbConfig.url}!`);

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    logger.info("Successfully connected to the database")
    app.listen(dbConfig.port, () => {
        logger.info(`Express App listening on port ${dbConfig.port}!`)
        require('./app/services/populate.js').populate();
        // const swaggerUi = require('swagger-ui-express');
        // const swaggerDocument = require('./swagger.json');

        // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        const expressSwagger = require('express-swagger-generator')(app);

        let options = {
            swaggerDefinition: {
                info: {
                    description: 'FIS Group 5 Tournaments API',
                    title: 'Tournaments API',
                    version: '1.0.0',
                },
                host: dbConfig.host,
                basePath: global.BASE_API_PATH,
                produces: [
                    "application/json",
                    "application/xml"
                ],
                schemes: ['http','https'],
                securityDefinitions: {
                    JWT: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'x-access-token',
                        description: "",
                    }
                }
            },
            basedir: __dirname, //app absolute path
            files: ['./docs/swagger/*.js'] //Path to the API handle folder
        };
        expressSwagger(options)
    });
}).catch(err => {
    logger.error('Could not connect to the database. Exiting now...', err);
    process.exit();
});


module.exports = app;



