
// Frontend: src/components/AddCustomer.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AddCustomer.css';

function AddCustomer() {
  const navigate = useNavigate();
  const location = useLocation();
  const gender = new URLSearchParams(location.search).get('gender');

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    dueDate: '',
    gender: gender || 'male',
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSaveAndNext = () => {
    if (customer.name && customer.phone && customer.dueDate) {
      localStorage.setItem('customerData', JSON.stringify(customer));
      navigate('/category');
    } else {
      alert('Please fill all the fields');
    }
  };

  return (
    <div className="add-customer-container">
      <h2>Add New Customer</h2>
      <form className="customer-form">
        <label>Name:</label>
        <input type="text" name="name" value={customer.name} onChange={handleChange} required />

        <label>Phone Number:</label>
        <input type="tel" name="phone" value={customer.phone} onChange={handleChange} required />

        <label>Due Date:</label>
        <input type="date" name="dueDate" value={customer.dueDate} onChange={handleChange} required />

        <div className="form-buttons">
          <button type="button" className="save-next-button" onClick={handleSaveAndNext}>Save & Next</button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomer;
