// Modules
const express = require('express');
const Router =  express.Router();
const auth = require('../../middlewares/auth');

// Transaction Model
const Transaction = require('../../models/Transaction');

// @route   POST api/transactions/
// @desc    Get all transactions in a specific month
// @access  Private
Router.post('/', auth, (req, res) => {
    // Get the inputs values
    const {start, end} = req.body;
    // Validate the values
    if (!start) {
        res.status(400).json({mgs: 'Please choose a month'});
    }
    // Date Query
    const dateQuery = end ? {$gte: start, $lte: end} : {$gte: start}
    // Get Transactions for this user by month
    Transaction.find({userId: req.user.id, date: dateQuery})
        .then(transactions => {
            res.json(transactions);
        });
});

// @route   GET api/transactions/search/
// @desc    Search transactions
// @access  Private
// Router.get('/search', auth, (req, res) => {
//     Transaction.find({userId: req.user.id, date: {$gte: req.date.start, $lte: req.date.end}})
//         .then(transactions => res.json(transactions));
// });

// @route   GET api/transactions/:tid
// @desc    Get transaction details
// @access  Private
Router.get('/:tid', auth, (req, res) => {
    Transaction.findOne({_id: req.params.tid, userId: req.user.id})
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json({msg: "Couldn't find the transaction"}));
});

// @route   POST api/transactions/create/
// @desc    Create a new transaction
// @access  Private
Router.post('/create', auth, (req, res) => {
    // Get the inputs values
    const {categoryId, amount, date, note} = req.body;
    // Validate the values
    if (!categoryId || !amount || !date) {
        res.status(400).json({mgs: 'Please enter all fields'});
    }
    // Create a new Transaction
    const newTransaction = new Transaction({
        category: categoryId,
        amount,
        date,
        note,
        userId: req.user.id
    });
    // Add it to the database
    newTransaction.save()
        .then(transaction => res.json({
            msg: "Added Successfully",
            transaction
        }))
        .catch(err => res.status(400).json({msg: "Adding Failed"}));
});

// @route   PATCH api/transactions/:tid
// @desc    Update a transaction by Id
// @access  Private
Router.patch('/:tid', auth, (req, res) => {
    // Get the inputs values
    const {categoryId, amount, date, note} = req.body;
    // Validate the values
    if (!categoryId || !amount || !date) {
        res.status(400).json({mgs: 'Please enter all fields'});
    }
    // Check if there's a transaction with this ID
    Transaction.findById(req.params.tid)
        .then(transaction => {
            // Check if this transaction does't belong to the user
            if (transaction.userId !== req.user.id) return res.status(400).json({msg: "You don't have access to this transaction"});
            // Assign the new values
            transaction.category = categoryId;
            transaction.amount = amount;
            transaction.date = date;
            transaction.note = note;
            // Update the transaction
            transaction.save()
                .then(transaction => res.json({
                    msg: "Updated Successfully",
                    transaction
                }))
                .catch(err => res.status(400).json({msg: "Updating Failed"}));
        })
        .catch(err => res.status(400).json({msg: "There's no transaction with this ID"}));
});

// @route   DELETE api/transactions/:tid
// @desc    Delete a transaction by Id
// @access  Private
Router.delete('/:tid', auth, (req, res) => {
    // Check if there's a transaction with this ID
    Transaction.findById(req.params.tid)
        .then(transaction => {
            // Check if this transaction belongs to the user
            if (transaction.userId !== req.user.id) return req.status(400).json({msg: "You don't have access to this transaction"});
            // Delete the transaction
            transaction.deleteOne()
                .then(() => res.json({msg: 'Deleted Successfully'}))
                .catch(err => res.status(400).json({msg: "Deleting Failed"}));
        })
        .catch(err => res.status(400).json({msg: "There's no transaction with this ID"}));
});

module.exports = Router;