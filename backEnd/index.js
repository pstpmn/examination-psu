const application = require('./src/app');
const config = require('./src/config/env');
const db = require('./src/config/connect');
const redis = require('redis')


const run = () => {
    const app = application();

    app.use(require('express').static(('./src/public/')));
    
    app.listen(config.port, () => {
        console.log('application running on port : ' + config.port);
    })

}

//setting global function 
global.db = db;
global.jwt = require('jsonwebtoken');
global.__basedir = __dirname;
global.privateKey = require('./src/config/key.json');
global.fn = require('./src/helpers/function')

//running Application
run();