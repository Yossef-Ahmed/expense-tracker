const Router = require('express').Router();
const auth = require('../../../middlewares/auth');

/**
 * @swagger
 * /api/transactions:
 *  post:
 *      description: Get the user's transactions
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: start
 *            in: formData
 *            required: true
 *            type: string
 *          - name: end
 *            in: formData
 *            type: string
 *      responses:
 *          '200':
 *              description: Got The Transactions Successfully
 *          '400':
 *              description: Please choose a month
 */
Router.post("/", auth, require('./get-transactions'));

/**
 * @swagger
 * /api/transactions/create:
 *  post:
 *      description: Create a new transaction for this user
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: categoryId
 *            in: formData
 *            required: true
 *            type: string
 *          - name: amount
 *            in: formData
 *            required: true
 *            type: string
 *          - name: date
 *            in: formData
 *            required: true
 *            type: string
 *          - name: note
 *            in: formData
 *            type: string
 *      responses:
 *          '200':
 *              description: Added Successfully
 *          '500':
 *              description: Adding Failed
 *          '406':
 *              description: Please enter all fields
 */
Router.post("/create", auth, require('./create-transaction'));

/**
 * @swagger
 * /api/transactions/:id:
 *  patch:
 *      description: Update a transaction for this user
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: categoryId
 *            in: formData
 *            required: true
 *            type: string
 *          - name: amount
 *            in: formData
 *            required: true
 *            type: string
 *          - name: date
 *            in: formData
 *            required: true
 *            type: string
 *          - name: note
 *            in: formData
 *            type: string
 *      responses:
 *          '200':
 *              description: Updated Successfully
 *          '500':
 *              description: Updating Failed
 *          '406':
 *              description: Please enter all fields
 *          '403':
 *              description: You don't have access to this transaction
 *          '400':
 *              description: There's no transaction with this ID
 */
Router.patch("/:id", auth, require('./update-transaction'));

/**
 * @swagger
 * /api/transactions/:id:
 *  delete:
 *      description: Delete a transaction for this user
 *      produces:
 *          - application/json
 *      responses:
 *          '200':
 *              description: Deleted Successfully
 *          '500':
 *              description: Deleting Failed
 *          '403':
 *              description: You don't have access to this transaction
 *          '400':
 *              description: There's no transaction with this ID
 */
Router.delete("/:id", auth, require('./delete-transaction'));

module.exports = Router;