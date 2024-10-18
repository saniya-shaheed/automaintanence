import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminCustomer() {
  const [customers, setCustomers] = useState([]);
  const [totalAmountSum, setTotalAmountSum] = useState(0);
  const [receivedAmountSum, setReceivedAmountSum] = useState(0);
  const [pendingAmountSum, setPendingAmountSum] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/customers/');
        const customerData = response.data; // Get data from response
        setCustomers(customerData);

        let totalSum = 0;
        let receivedSum = 0;
        let pendingSum = 0;

        customerData.forEach((customer) => {
          totalSum += customer.amount?.total || 0;
          receivedSum += customer.amount?.received || 0;
          pendingSum += customer.amount?.pending || 0;
        });

        setTotalAmountSum(totalSum);
        setReceivedAmountSum(receivedSum);
        setPendingAmountSum(pendingSum);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div>
      <h3>CUSTOMERS</h3>
      <button type="button" onClick={() => navigate('/adminDAF/customers/add-customer')}>
        ADD CUSTOMER
      </button>

      <table>
        <thead>
          <tr>
            <th rowSpan="2">Customer ID</th>
            <th rowSpan="2">Name</th>
            <th rowSpan="2">Phone</th>
            {/* Vehicle main header with sub-headers */}
            <th colSpan="3">Vehicle</th>
            {/* Service main header with sub-headers */}
            <th colSpan="3">Service</th>
            {/* Amount main header with sub-headers */}
            <th colSpan="3">Amount</th>
            <th rowSpan="2">No. of Vehicles</th>
          </tr>
          <tr>
            {/* Vehicle sub-headers */}
            <th>Reg No</th>
            <th>Brand</th>
            <th>Model</th>
            {/* Service sub-headers */}
            <th>Type</th>
            <th>Date Received</th>
            <th>Date Delivered</th>
            {/* Amount sub-headers */}
            <th>Total</th>
            <th>Received</th>
            <th>Pending</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td><a href={`/adminDAF/${customer.customerId}`}>{customer.customerId}</a></td>
              <td><a href={`/adminDAF/${customer.customerId}`}>{customer.name}</a></td>
              <td>{customer.phone}</td>
              {/* Vehicle details */}
              <td>{customer.vehicle?.regNo}</td>
              <td>{customer.vehicle?.brand}</td>
              <td>{customer.vehicle?.model}</td>
              {/* Service details */}
              <td>{customer.service?.typeOfService}</td>
              <td>{customer.service?.received}</td>
              <td>{customer.service?.delivered}</td>
              {/* Amount details */}
              <td>{customer.amount?.total}</td>
              <td>{customer.amount?.received}</td>
              <td>{customer.amount?.pending}</td>
              <td>{customer.vehicleCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>Total Amount: {totalAmountSum}</p>
        <p>Received Amount: {receivedAmountSum}</p>
        <p>Pending Amount: {pendingAmountSum}</p>
      </div>
    </div>
  );
}

export default AdminCustomer;
