const express = require('express');
const router = express.Router();
const expenses = require('../models/expenses');

const getAllExpenses = async () => {
    try {
    const allExpenses = await expenses.find();
    return allExpenses;
    } catch (err) {
        throw new Error('Error while fetching data');
    }
}

// Route to add new expense
router.post('/', async (req, res) => {
    try {
        const newExpense = new expenses(req.body);
        const savedExpenses = await newExpense.save(); 
        res.status(201).json(savedExpenses);
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
});

// Route to get all expenses
router.get('/', async (req, res) => {
    try {
        const allExpenses = await getAllExpenses(); 
        res.status(200).json(allExpenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error });
    }
});

// Route to update expense's info
router.put('/:amount', async (req, res) => {
    try {
        const amount = req.params.amount;
        const updatedData = req.body;

        const updatedExpense = await expenses.findOneAndUpdate(
            { amount: amount },
            { $set: updatedData },
            { new: true, runValidators: true }
        );
        
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Error updating expense', error });
    }
});

// Route to delete an expense
router.delete('/description/:description', async (req, res) => {
    try {
        const { description} = req.params;

        const deletedExpense = await expenses.findOneAndDelete({ description:  description }); 

        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json(deletedExpense); 
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error });
    }
});


//Route to get the sum of amount of all expenses
router.get('/total-expense', async (req, res) => {
    try {
        const allExpenses = await getAllExpenses();
        const totalExpenses = allExpenses.reduce((sum, expense) => sum + expense.amount, 0)
        res.status(200).json({totalExpenses});
    } catch (err) {
        res.status(500).json("Error finding total expense", err)
    }
})
module.exports = router;
