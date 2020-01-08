const mongoose = require('mongoose');
const dbConfig = require('./conf/dbConfig.js');

const dbConnect = () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    return mongoose.connect(dbConfig.url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
}

module.exports = dbConnect;