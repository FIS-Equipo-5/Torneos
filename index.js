
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
                host: 'localhost:3000',
                basePath: '/v1',
                produces: [
                    "application/json",
                    "application/xml"
                ],
                schemes: ['http'],
                // securityDefinitions: {
                //     JWT: {
                //         type: 'apiKey',
                //         in: 'header',
                //         name: 'Authorization',
                //         description: "",
                //     }
                // }
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



