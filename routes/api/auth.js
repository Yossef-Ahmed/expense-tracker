const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret || require('config').get('jwtSecret');
const auth = require('../../middlewares/auth');
const Router = express.Router();

// User Model
const User = require('../../models/User');

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
Router.post('/register', (req, res) => {
    // Get the inputs values
    const {name, email, password} = req.body;
    // Sample validation
    if (!name || !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }
    // Check if there's an existing user
    User.findOne({email})
        .then(user => {
            // If user exists, return an error
            if (user) return res.status(400).json({msg: 'User already exists'});
            // Create new user
            const newUser = new User({
                name,
                email,
                password
            });
            // Hash the password
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    // Store the hashed password
                    newUser.password = hash;
                    // Add the user to the database
                    newUser.save()
                        .then(user => {
                            // Create a token
                            jwt.sign(
                                {id: user.id},
                                jwtSecret,
                                {expiresIn: 3600},
                                (err, token) => {
                                    if (err) throw err;
                                    // Return user & token
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        },
                                        categories: user.categories
                                    });
                                }
                            );
                        });
                });
            });
        });
});

// @route   POST api/auth/login
// @desc    Login a user
// @access  Public
Router.post('/login', (req, res) => {
    // Get the inputs values
    const {email, password} = req.body;
    // Sample Validation
    if (!email || !password) {
        res.status(400).json({msg: 'Please enter all fields'});
    }
    // Check if user exists
    User.findOne({email})
        .then(user => {
            // If user does not exist, return an error
            if (!user) return res.status(400).json({msg: 'User does not exist'});
            // Compare the hashed passwords
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    // If the password doesn't match, throw an error
                    if(!isMatch) return res.status(400).json({msg: 'Please enter the right email and password'});
                    // Create a token
                    jwt.sign(
                        {id: user.id},
                        jwtSecret,
                        {expiresIn: 3600},
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                },
                                categories: user.categories
                            });
                        }
                    );
                });
        });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
Router.get('/user', auth, (req, res) => {
    User.findById(req.user.id).select('-password')
        .then(user => res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            categories: user.categories
        }));
});

module.exports = Router;