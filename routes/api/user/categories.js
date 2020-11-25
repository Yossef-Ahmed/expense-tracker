// Modules
const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../../middlewares/auth');

// User Model & Category Model
const User = require('../../../models/User');
const Category = require('../../../models/Category');
const Transaction = require('../../../models/Transaction');

// @route   GET api/user/categories/
// @desc    Get all of this user categories
// @access  Private
Router.get('/', auth, (req, res) => {
    User.findById(req.user.id).select('categories')
        .then(user => res.json(user.categories));
});

// @route   GET api/user/categories/:cid
// @desc    Get category details
// @access  Private
Router.get('/:cid', auth, (req, res) => {
    User.findById(req.user.id).select('categories')
        .then(user => {
            const category = user.categories.filter(cat => cat._id == req.params.cid);
            res.json(category[0]);
        });
});

// @route   POST api/user/categories/
// @desc    Create a new category
// @access  Private
Router.post('/', auth, (req, res) => {
    // Get the inputs values
    const {name, type} = req.body;
    // Validate the values
    if (!name || !type) {
        res.status(400).json({mgs: 'Please enter all fields'});
    }
    // Get the user
    User.findById(req.user.id)
        .then(user => {
            // Assign the new categroy
            const category = new Category({
                name,
                type
            });
            user.categories.push(category);
            // Add the category
            user.save()
                .then(user => res.json({
                    msg: "Added Successfully",
                    category
                }))
                .catch(err => res.status(400).json({msg: "Adding Failed"}));
        })
        .catch(err => res.status(400).json({msg: "There's no user with this ID"}));
});

// @route   PATCH api/user/categories/:id
// @desc    Update a category
// @access  Private
Router.patch('/:id', auth, (req, res) => {
    // Get the inputs values
    const {name, type} = req.body;
    // Validate the values
    if (!name || !type) {
        res.status(400).json({mgs: 'Please enter all fields'});
    }
    // Get the user
    User.findById(req.user.id)
        .then(user => {
            // Check if there's a category with this ID
            const getCategory = user.categories.filter(cat => cat._id == req.params.id);
            if (getCategory.length === 0) return res.status(400).json({msg: "There's no category with this ID"});
            // Delete the category
            const categories = user.categories.filter(cat => cat._id != req.params.id);
            // Assign the new categroy
            const category = {
                _id: req.params.id,
                name,
                type
            };
            categories.push(category);
            // Add it to the user
            user.categories = categories;
            // Update the category
            user.save()
                .then(user => res.json({
                    msg: "Updated Successfully",
                    category
                }))
                .catch(err => res.status(400).json({msg: "Updating Failed"}));
        })
        .catch(err => res.status(400).json({msg: "There's no user with this ID"}));
});

// @route   DELETE api/user/categories/:id
// @desc    Delete a category by id
// @access  Private
Router.delete('/:id', auth, (req, res) => {
    // Get the user
    User.findById(req.user.id)
        .then(user => {
            // Check if there's a category with this ID
            const getCategory = user.categories.filter(cat => cat._id == req.params.id);
            if (getCategory.length === 0) return res.status(400).json({msg: "There's no category with this ID"});
            // Delete any transaction that have this category
            Transaction.deleteMany({category: req.params.id})
                .then(() => {
                    // Delete the category
                    const categories = user.categories.filter(cat => cat._id != req.params.id);
                    user.categories = categories;
                    // Save the categories
                    user.save()
                        .then(user => res.json({msg: "Deleted Successfully"}))
                        .catch(err => res.status(400).json({msg: "Deleting Failed"}));
                })
                .catch(err => console.log(err));
        })
        .catch(err => res.status(400).json({msg: "There's no user with this ID"}));
});

module.exports = Router;