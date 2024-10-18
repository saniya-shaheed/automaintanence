const mongoose = require('mongoose')

const expensesSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const expenses = mongoose.model('expenses', expensesSchema);
module.exports = expenses;