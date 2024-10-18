import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2'; // Importing Line chart
import 'chart.js/auto'; // Required for chart.js

function AdminDashboard() {
    const [revenue, setRevenue] = useState(0);
    const [noOfCustomers, setNoOfCustomers] = useState(0);
    const [noOfVehicles, setNoOfVehicles] = useState(0);
    const [noOfEmployees, setNoOfEmployees] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [profit, setProfit] = useState(0);
    const navigate = useNavigate();

  const getTodaysDate = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString(undefined, options); // e.g., "October 16, 2024"
};


    useEffect(() => {
        const fetchData = async () => {
          try {
            //to get total amount from customers
          const customerAmountResponse = await axios.get('http://localhost:5000/customers/total-amount')
          const customerAmount = customerAmountResponse.data.totalAmount; 
          //to display revenue
          const revenueAmount = customerAmount; 
        setRevenue(revenueAmount)

        //total expense
        const totalExpenseResponse = await axios.get('http://localhost:5000/expenses/total-expense')
        const expenseAmount = totalExpenseResponse.data.totalExpenses;
        setTotalExpense(expenseAmount);

        //profit
        const calculatedProfit = revenueAmount - expenseAmount;
        setProfit(calculatedProfit)

        //to get total number of customers
        const responseNoOfCustomers = await axios.get('http://localhost:5000/customers/total-customers')
        const numberOfCustomers = responseNoOfCustomers.data.totalCustomers;
        setNoOfCustomers(numberOfCustomers);

        //to get total number of vehicles
        const responseNoOfVehicles = await axios.get('http://localhost:5000/customers/total-vehicles')
        const numberOfVehicles = responseNoOfVehicles.data.totalVehicles;
        setNoOfVehicles(numberOfVehicles);

        //to get total number of employees 
        const responseNoOfEmployees = await axios.get('http://localhost:5000/employees/total-employees')
        const numberOfEmployees = responseNoOfEmployees.data.totalEmployees;
        setNoOfEmployees(numberOfEmployees);    

      } catch (error) {
        console.error("Error fetching amount", error);
      }
      }
        fetchData();
        
      }, []);

      const handleAddCustomer = () => {
        navigate('/adminDAF/add-customer');
      }

      const handleAddExpense = () => {
        navigate('/adminDAF/add-expense')
      }
    
      const data = {
        labels: ['Revenue', 'Expenses', 'Profit'], // X-axis labels
        datasets: [
          {
            label: 'Amount in USD',
            data: [revenue, totalExpense, profit], // Y-axis data points
            backgroundColor: ['rgba(75,192,192,0.4)', 'rgba(255,99,132,0.4)', 'rgba(54,162,235,0.4)'],
            borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)', 'rgba(54,162,235,1)'],
            borderWidth: 1,
          },
        ],
      };
  return (
    <div>
      <h1>Summary</h1>
      <h6> {getTodaysDate()}</h6>
      <p><strong>Revenue: </strong>${revenue}</p>
      <div style={{ width: '600px', height: '400px' }}>
        <Line data={data} />
      </div>
      <p> No of Customers: {noOfCustomers} </p>
      <p> No of Vehicles: {noOfVehicles} </p>
      <p> No of Employees: {noOfEmployees} </p>
      <button type="submit" onClick={handleAddCustomer}>New Customer</button>
      <button type="submit" onClick={handleAddCustomer}>New Vehicle</button>
      <button type="submit" onClick={handleAddExpense}>New Expense</button>
    </div>
  );
}

export default AdminDashboard;
