
// Frontend: src/components/Pending.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Pending.css';

function Pending() {
  const navigate = useNavigate();
  const [pendingCustomers, setPendingCustomers] = useState([]);

  useEffect(() => {
    // Fetch pending customers from local storage or an API
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    
    // Filter customers whose orders are not marked as completed
    const pendingList = customers.filter(customer => !customer.isCompleted);
    setPendingCustomers(pendingList);
  }, []);

  return (
    <div className="pending-container">
      <h2>Pending Orders</h2>
      
      {pendingCustomers.length === 0 ? (
        <p>No pending customers.</p>
      ) : (
        <div className="customer-list">
          {pendingCustomers.map(customer => (
            <div key={customer.phone} className="customer-card" onClick={() => navigate(`/customer-details?phone=${customer.phone}`)}>
              <img src={customer.image || '/images/default-cloth.png'} alt="Cloth" className="customer-image" />
              <div className="customer-info">
                <h3>{customer.name}</h3>
                <p>Phone: {customer.phone}</p>
                <p>Due Date: {customer.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="back-btn" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default Pending;
