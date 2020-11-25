const mongoose = require('mongoose');
const Category = require('./Category');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
    categories: {
        default: Category.find().then(categories => categories),
        type: Array
    }
});

module.exports = mongoose.model('user', UserSchema);
