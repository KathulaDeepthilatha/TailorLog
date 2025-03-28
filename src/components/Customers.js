
// Frontend: src/components/Customers.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Customers.css';

function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch customers from localStorage or API
    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    setCustomers(storedCustomers);
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  return (
    <div className="customers-container">
      <header className="customers-header">
        <h2>Customers</h2>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="customer-list">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="customer-card"
              onClick={() => navigate(`/customer-details/${customer.id}`)}
            >
              <img src={customer.categories[0]?.image || '/images/default-cloth.png'} alt="Clothing" />
              <div className="customer-info">
                <h3>{customer.name}</h3>
                <p>📞 {customer.phone}</p>
                <p>Due Date: {customer.dueDate}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No customers found.</p>
        )}
      </div>
    </div>
  );
}

export default Customers;
