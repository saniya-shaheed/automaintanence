const express = require('express');
const router = express.Router();
const employees = require('../models/employees')

const getAllEmployees = async() => {
    try {
    const allEmployees = await employees.find();
    return allEmployees;
    } catch (error) {
        throw new Error('Error while fetching data');
    }
}
//Route to get all employees
router.get('/', async (req, res) => {
    try {
        const allEmployees = await getAllEmployees();
        console.log(allEmployees)
        res.status(200).json(allEmployees);
        console.log(allEmployees)
    } catch (error) {
        res.status(500).json({message: 'error fetching data', error})
        console.log('Error:' , error)
    }
})

//Route to add new employee
router.post('/add-employee', async (req, res) => {
    try {
    const newEmployee = new employees(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
} catch (error) {
    res.status(400).json({ message: error.message })
}
})

//Route to update an employee info
router.put('/:name', async (req, res) => {
    try {
    const name = req.params.name;
    const updatedData = req.body;

    const updatedEmployee = await employees.findOneAndUpdate(
        {name: name},
        {$set : updatedData},
        {new: true, runValidators: true}
    )

    if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
} catch (error) {
    res.status(500).json({ message: 'Error updating employee', error})
}
})

// Route to delete an employee by name
router.delete('/name/:name', async (req, res) => {
    try {
        const { name } = req.params;

        const deletedEmployee = await employees.findOneAndDelete({ name: name});

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(deletedEmployee); 
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
});

//route to get number of employees
router.get('/total-employees', async (req, res) => {
    try {
        const totalEmployees = await employees.countDocuments();
        res.status(200).json({totalEmployees})
    } catch (err) {
        res.status(500).json({message: 'Error', error: err})
    }
})


module.exports = router;