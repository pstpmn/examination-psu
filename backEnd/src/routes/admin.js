const adminController = require('./../controllers/admin');
const upload = require('./../middlewares/img.upload');
const middleware = require('./../middlewares/checkParams');
const auth = require('./../middlewares/auth');

let routes = (app) => {
    app.get("/", auth, adminController.index);
    app.get("/auth", auth, adminController.auth);
    app.post("/login", adminController.login);
    app.get("/newUser", auth, adminController.newUser);
    app.post("/search", auth, adminController.searchUser);
    app.get("/info/:id", auth, adminController.userInfo);



}
module.exports = routes;