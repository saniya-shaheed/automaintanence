const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config(); // To load environment variables from .env file
const customerRoutes = require('./Routes/customers')
const expensesRoutes = require('./Routes/expenses')
const employeeRoutes = require('./Routes/employees')
const authRoutes= require('./Routes/auth')

const app = express()
app.use(cors()) // Enable Cross-Origin Resource Sharing 
app.use(express.json()) // Parse incoming JSON requests



app.use('/customers', customerRoutes);
app.use('/expenses', expensesRoutes);
app.use('/employees', employeeRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err))