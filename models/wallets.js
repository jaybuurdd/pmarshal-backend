const mongoose = require('mongoose');

const walletsSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        // required: true
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    }]
})

const wallet = mongoose.model('Wallet', walletsSchema);

module.exports = wallet;