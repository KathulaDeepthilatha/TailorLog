
// Frontend: src/components/History.js
import React, { useState, useEffect } from 'react';
import '../styles/History.css';

function History() {
  const [deletedCategories, setDeletedCategories] = useState([]);

  useEffect(() => {
    // Fetch deleted categories from localStorage or API
    const storedHistory = JSON.parse(localStorage.getItem('deletedCategories')) || [];
    setDeletedCategories(storedHistory);
  }, []);

  return (
    <div className="history-container">
      <header className="history-header">
        <h2>Deleted Items History</h2>
      </header>

      <div className="history-list">
        {deletedCategories.length > 0 ? (
          deletedCategories.map((item, index) => (
            <div key={index} className="history-item">
              <img src={item.image || '/images/default-cloth.png'} alt="Clothing" />
              <div className="history-info">
                <h3>{item.category}</h3>
                <p>Customer: {item.customerName}</p>
                <p>Deleted on: {item.deletedDate}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-history">No deleted items found.</p>
        )}
      </div>
    </div>
  );
}

export default History;
