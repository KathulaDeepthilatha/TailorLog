
// Frontend: src/components/Completed.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Completed.css';

function Completed() {
  const navigate = useNavigate();
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    // Fetch completed customers from localStorage or API
    const storedCompleted = JSON.parse(localStorage.getItem('completedOrders')) || [];
    setCompletedOrders(storedCompleted);
  }, []);

  return (
    <div className="completed-container">
      <h2>Completed Orders</h2>
      {completedOrders.length > 0 ? (
        <div className="completed-list">
          {completedOrders.map((order, index) => (
            <div key={index} className="completed-card" onClick={() => navigate(`/customer-details/${order.id}`)}>
              <img src={order.image} alt="Clothing Item" />
              <div className="completed-info">
                <h3>{order.name}</h3>
                <p>Phone: {order.phone}</p>
                <p>Due Date: {order.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No completed orders yet.</p>
      )}
    </div>
  );
}

export default Completed;
