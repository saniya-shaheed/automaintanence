const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');



// Sign Up
router.post('/signup', async (req, res) => {
    try {
        const {email, userName, password} = req.body;

        //checking if user already exist
        const existingAdmin = await admin.findOne({ userName });
        if (existingAdmin) {
            return res.status(400).json({message: "Admin already exists"})
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new admin
        const newAdmin = new admin({email, userName, password: hashedPassword});
        await newAdmin.save();
        res.status(201).json({message: 'Admin created successfully'})
    } catch (error) {
        res.status(500).json({message: 'Error signing up', error})
    }
})


//Log In
// Log In
router.post('/login', async function (req, res) {
    try {
        const { userName, password } = req.body;
        const Admin = await admin.findOne({ userName });
        
        // Check if admin exists
        if (!Admin) {
            return res.status(400).json({ success: false, message: 'Admin not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, Admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Password" });
        }

        // Generate token
        const token = jwt.sign({ id: Admin._id }, process.env.JWT_SECRET, { expiresIn: '1hr' });

        // Send success response with token
        res.status(200).json({ success: true, message: 'Login Successful', token });
    } catch (error) {
        console.error("Login error:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Login Failed', error: error.message });
    }
});


module.exports= router;
