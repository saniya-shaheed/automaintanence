const express = require('express');
const router = express.Router();
const customers = require('../models/customers');

const getAllCustomers = async () => {
    try {
        const allCustomers = await customers.find();
        return allCustomers;
    } catch (err) {
        throw new Error('Error while fetcing data')
    }
}

// Route to add new customer
router.post('/add-customer', async (req, res) => {
    try {
        const newCustomer = new customers(req.body);
        const savedCustomer = await newCustomer.save(); // Save customer to database
        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
});

// Route to get all customers
router.get('/', async (req, res) => {
    try {
        const allCustomers = await getAllCustomers(); // Retrieve all customers
        res.status(200).json(allCustomers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error });
    }
});

// Route to update customer's info
router.put('/:customerId', async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const updatedData = req.body;

        const updatedCustomer = await customers.findOneAndUpdate(
            { customerId: customerId },
            { $set: updatedData },
            { new: true, runValidators: true }
        );
        
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating customer', error });
    }
});

// Route to delete a customer by phone number
router.delete('/phone/:phone', async (req, res) => {
    try {
        const { phone } = req.params;

        const deletedCustomer = await customers.findOneAndDelete({ phone: phone }); // Delete customer by phone

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(deletedCustomer); // Return deleted customer details
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error });
    }
});



//Route to get the sum of amount of all customers
router.get('/total-amount', async (req, res) => {
    try {
        const allCustomers = await getAllCustomers(); 
        const totalAmount = allCustomers.reduce((sum, customer) => sum + customer.amount.total, 0)
        res.status(200).json({totalAmount});
    } catch (err) {
        res.status(500).json({ message: "Error finding total amount", error: err})
    }
})

//Route to get the number of  customers
router.get('/total-customers', async (req, res) => {
    try {
        const totalCustomers = await customers.countDocuments(); 
        res.status(200).json({totalCustomers});
    } catch (err) {
        res.status(500).json({ message: "Error finding total customers", error: err})
    }
})

//Route to get the number of vehicles
router.get('/total-vehicles', async (req, res) => {
    try {
        const totalVehicles = await customers.countDocuments({'vehicle': { $exists: true}}); 
        res.status(200).json({totalVehicles});
    } catch (err) {
        res.status(500).json({ message: "Error finding total vehicles", error: err})
    }
})

module.exports = router;

