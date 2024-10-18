const mongoose = require('mongoose')
const customerIdCounter = require('./customerIdCounter')

const customerSchema = new mongoose.Schema({
    customerId: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    vehicle: {
        regNo: {
            type: String,
            required: true,
            unique: true
        },
        brand: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        }
    },
    service: {
        typeOfService : {
            type: String,
        required: true,
    },
        recieved: {
            type: Date,
            required: true
        },
        delivered: {
            type: Date,
        }
    },
    amount: {
        total: {
            type: Number,
            default: 0,
        },
        recieved: {
            type: Number,
            default: 0,
        },
        pending: {
            type: Number,
            default: 0,
        }
    }
});

//pre-save the hook to generate customer id
customerSchema.pre('save', async function (next) {
    const customer = this;
    const currentYear = new Date().getFullYear();
    const idCounter = await customerIdCounter.findOne({id: 'customerId'});

    if(!idCounter || idCounter.year !== currentYear) {
        await customerIdCounter.findOneAndUpdate (
            {id: 'customerId'},
            {seq: 1, year: currentYear},
            { new: true, upsert: true},
        )
        customer.customerId = `${currentYear}001`;
    } else {
        const updatedCustomerIdCounter = await customerIdCounter.findOneAndUpdate(
            {id: 'customerId'},
            {$inc: {seq: 1}},
            {new: true},
        )
        customer.customerId = `${currentYear}${String(updatedCustomerIdCounter.seq).padStart(3, '0')}`;
    }

    if(customer.amount.total == null || customer.amount.recieved == null) {
        customer.amount.pending == null
    } else {
        customer.amount.pending =customer.amount.total - customer.amount.recieved
    }

    next()
})

const customers = mongoose.model('customers', customerSchema);
module.exports = customers;