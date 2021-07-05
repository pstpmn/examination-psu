const usersController = require('./../controllers/users');
const upload = require('./../middlewares/img.upload');
const middleware = require('./../middlewares/checkParams');

let routes = (app) => {
    app.post("/insert", upload.single('single'), middleware.beforeInsertInfo, usersController.insertInfo);
}
module.exports = routes;