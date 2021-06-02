const Router = require('express').Router();
const auth = require('../../../../middlewares/auth');

/**
 * @swagger
 * /api/user/categories:
 *  get:
 *      description: Get the user categories
 *      produces:
 *          - application/json
 *      responses:
 *          '200':
 *              description: Got The Categories Successfully
 *          '500':
 *              description: Getting Categories Failed
 */
Router.get("/", auth, require('./get-categories'));

/**
 * @swagger
 * /api/user/categories/:id:
 *  get:
 *      description: Get a user's category details
 *      produces:
 *          - application/json
 *      responses:
 *          '200':
 *              description: Got The Category Details Successfully
 */
Router.get("/id", auth, require('./get-category'));

/**
 * @swagger
 * /api/user/categories:
 *  post:
 *      description: Create a new category for this user
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: name
 *            in: formData
 *            required: true
 *            type: string
 *          - name: type
 *            in: formData
 *            required: true
 *            type: string
 *      responses:
 *          '200':
 *              description: Added Successfully
 *          '500':
 *              description: Adding Failed
 *          '406':
 *              description: Please enter all fields
 */
Router.post("/", auth, require('./create-category'));

/**
 * @swagger
 * /api/user/categories:
 *  patch:
 *      description: Create a new category for this user
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: name
 *            in: formData
 *            required: true
 *            type: string
 *          - name: type
 *            in: formData
 *            required: true
 *            type: string
 *      responses:
 *          '200':
 *              description: Updated Successfully
 *          '500':
 *              description: Updating Failed
 *          '406':
 *              description: Please enter all fields
 *          '400':
 *              description: There's no category with this ID
 *          '401':
 *              description: There's no user with this ID
 */
Router.patch("/:id", auth, require('./update-category'));

/**
 * @swagger
 * /api/user/categories:
 *  delete:
 *      description: Delete a category for this user
 *      produces:
 *          - application/json
 *      responses:
 *          '200':
 *              description: Deleted Successfully
 *          '500':
 *              description: Deleting Failed
 *          '400':
 *              description: There's no category with this ID
 *          '401':
 *              description: There's no user with this ID
 */
Router.delete("/:id", auth, require('./delete-category'));

module.exports = Router;