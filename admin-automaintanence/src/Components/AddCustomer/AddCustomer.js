import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCustomer() {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleRegNo, setVehicleRegNo] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [dateRecieved, setDateRecieved] = useState('');
  const [dateDelivered, setDateDelivered
  ] = useState('');
  const [amountTotal, setAmountTotal] = useState('');
  const [amountRecieved, setAmountRecieved] = useState('');
  const [amountPending, setAmountPending] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create new customer object
    const newCustomer = { customerName, phone, vehicleRegNo, vehicleBrand, vehicleModel,
      serviceType, dateRecieved, dateDelivered, amountTotal, amountRecieved, amountPending
     };

    // Send a POST request to add new customer
    const response = await fetch('/api/customers/add-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCustomer),
    });

    if (response.ok) {
      // After successfully adding, navigate back to the customer list
      navigate('/customers');
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          name="name"
        />
        <br />

        <label>Phone:</label>
        <input
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
        />
        <br />

        <label>Vehicle Reg. No:</label>
        <input
          type="text"
          value={vehicleRegNo}
          onChange={(e) => setVehicleRegNo(e.target.value)}
          name="vehicleRegNo"
        />
        <br />

        <label>Brand:</label>
        <input
          type="text"
          value={vehicleBrand}
          onChange={(e) => setVehicleBrand(e.target.value)}
          name="vehicleBrand"
        />
        <br />

        <label>Model:</label>
        <input
          type="text"
          value={vehicleModel}
          onChange={(e) => setVehicleModel(e.target.value)}
          name="vehicleModel"
        />
        <br />

        <label>Service Type:</label>
        <input
          type="text"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          name="serviceType"
        />
        <br />

        <label>Date Started:</label>
        <input
          type="date"
          value={dateRecieved}
          onChange={(e) => setDateRecieved(e.target.value)}
          name="dateRecieved"
        />
        <br />

        <label>Date Finished:</label>
        <input
          type="date"
          value={dateDelivered}
          onChange={(e) => setDateDelivered(e.target.value)}
          name="dateDelivered"
        />
        <br />

        <label>Total Amount:</label>
        <input
          type="number"
          value={amountTotal}
          onChange={(e) => setAmountTotal(e.target.value)}
          name="amountTotal"
        />
        <br />

        <label>Amount Received:</label>
        <input
          type="number"
          value={amountRecieved}
          onChange={(e) => setAmountRecieved(e.target.value)}
          name="amountRecieved"
        />
        <br />

        <label>Amount Pending:</label>
        <input
          type="number"
          value={amountPending}
          onChange={(e) => setAmountPending(e.target.value)}
          name="amountPending"
        />
        <br />

        <button type="submit">Add Customer</button>
        <button type="button" onClick={() => navigate("/adminDAF/customers")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;
