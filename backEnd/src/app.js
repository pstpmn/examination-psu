const config = require('./config/env');
const bodyParser = require('body-parser');
const cors = require('cors');
const initRoutes = require('./routes/index');


const buildApp = () => {
    const app = require('express')();
    var corsOptions = {
        origin: '*',
        credentials: true
    };
    // create application/x-www-form-urlencoded parser
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json()); // parse form data client
    app.use(cors(corsOptions));
    initRoutes(app);
    return app;
}




module.exports = buildApp;