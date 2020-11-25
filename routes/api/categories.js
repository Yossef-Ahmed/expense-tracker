// Modules
const express = require('express');
const Router = express.Router();
const auth = require('../../middlewares/auth');

// Category Model
const Category = require('../../models/Category');

// @route   GET api/categories
// @desc    Get all global categories
// @access  Private
Router.get('/', auth, (req, res) => {
    Category.find()
        .then(categories => res.json(categories));
});

// @route   POST api/categories/
// @desc    Create a new global category
// @access  Private
Router.post('/', auth, (req, res) => {
    // Get the inputs values
    const {name, type} = req.body;
    // Validate the values
    if (!name || !type) {
        res.status(400).json({mgs: 'Please enter all fields'});
    }
    // Create a new Category
    const newCategory = new Category({
        name,
        type
    });
    // Add it to the database
    newCategory.save()
        .then(category => {
            res.json({
                msg: "Added Successfully",
                category
            })}
        )
        .catch(err => res.status(400).json({msg: "Adding Failed"}));
});

// @route   PATCH api/categories/:id
// @desc    Update a global category
// @access  Private
Router.patch('/:id', auth, (req, res) => {
    // Get the inputs values
    const {name, type} = req.body;
    // Validate the values
    if (!name || !type) {
        res.status(400).json({mgs: 'Please enter all fields'});
    }
    // Check if there's a category with this ID
    Category.findById(req.params.id)
        .then(category => {
            // Assign the new values
            category.name = name;
            category.type = type;
            // Update the category
            category.save()
                .then(category => res.json({
                    msg: "Updated Successfully",
                    category
                }))
                .catch(err => res.status(400).json({msg: "Updating Failed"}));
        })
        .catch(err => res.status(400).json({msg: "There's no category with this ID"}));
});

// @route   DELETE api/categories/:id
// @desc    Delete a global category by id
// @access  Private
Router.delete('/:id', auth, (req, res) => {
    // Check if there's a category with this ID
    Category.findById(req.params.id)
        .then(category => {
            // Delete the category
            category.deleteOne()
                .then(() => res.json({msg: 'Deleted Successfully'}))
                .catch(err => res.status(400).json({msg: "Deleting Failed"}));
        })
        .catch(err => res.status(400).json({msg: "There's no category with this ID"}));
});

module.exports = Router;