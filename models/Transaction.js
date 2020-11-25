const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    userId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('transaction', TransactionSchema);