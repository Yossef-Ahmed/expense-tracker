const Router = require('express').Router();
const auth = require('../../../middlewares/auth');

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      description: Register a new user
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: name
 *            in: formData
 *            required: true
 *            type: string
 *          - name: email
 *            in: formData
 *            required: true
 *            type: string
 *          - name: password
 *            in: formData
 *            required: true
 *            type: string
 *      responses:
 *          '200':
 *              description: Registered Successfully, Open your email to verify your account.
 *          '302':
 *              description: User already exists
 *          '400':
 *              description: Please enter all fields
 */
Router.post("/register", require('./register'));

Router.post("/login", require('./login'));

Router.post("/send-verification-code", require('./send-verification-code'));

Router.post("/verify-email", require('./verify-email'));

Router.get("/load-user", auth, require('./load-user'));

module.exports = Router;