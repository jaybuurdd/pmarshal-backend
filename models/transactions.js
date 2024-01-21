const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    timeStamp: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    }, 
    to: {
        type: String,
        required: true
    }, 
    value: {
        type: String,
        required: true
    }, 
    gas: {
        type: Number,
        required: true
    }, 
    gasPrice: {
        type: Number,
        required: true
    },
    isError: {
        type: String,
    },
    txreceipt_status: {
        type: String,
        required: true
    },
    confirmations: {
        type: Number,
        required: true
    }
});

const transaction = mongoose.model('Transaction', transactionsSchema);

module.exports = transaction;