const Router = require('express').Router();
const auth = require('../../../middlewares/auth');

Router.post("/register", require('./register'));
Router.post("/login", require('./login'));
Router.get("/load-user", auth, require('./load-user'));

module.exports = Router;