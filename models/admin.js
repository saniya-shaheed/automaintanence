const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const adminSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

//pre-save the hook after hashing password
adminSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//compare password
adminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password) 
}

module.exports = mongoose.model('admin', adminSchema)