const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    passportNo: {
        type: String,
        required: true
    },
    visaExpiry : {
        type: Date,
        required: true
    },
    emiratesID : {
        type: String,
        required: true
    }
})

const employees = mongoose.model('employees', employeeSchema)
module.exports  =employees;
