require('express-group-routes');
const addressController = require('./../controllers/address');


let routes = (app) => {

    app.get("/", (req, res) => {
        res.send('Hello World')
    }); // /api/v1/login 
    app.get("/provinces", addressController.provinces); // /api/v1/login 
    app.post("/amphures", addressController.amphures); // /api/v1/login 
    app.post("/districts", addressController.districts); // /api/v1/login 

    app.group("/users", (app) => {
        require('./users')(app)
    });
    app.group("/admin", (app) => {
        require('./admin')(app)
    });



    // return app
}
module.exports = routes;