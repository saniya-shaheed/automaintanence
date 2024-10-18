const mongoose = require('mongoose')

const customerIdSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    seq: {
        type: Number,
        default: 0,
    },
    year: {
        type: Number,
        required: true,
    }
    });

    const customerIdCounter = mongoose.model('customerIdCounter', customerIdSchema)
    module.exports = customerIdCounter;