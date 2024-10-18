const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    month : {
        type: Date,
        required: true,
    },
    revenue: {
        type: Number,
        required: true
    },
    expense: {
        type: Number,
        required: true
    },
    profit: {
        type: Number,
        required: true
    }
    
})

const income= mongoose.model('income', incomeSchema)
module.exports  =income;
