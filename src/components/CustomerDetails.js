
// Frontend: src/components/CustomerDetails.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/CustomerDetails.css';

function CustomerDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get customer ID from URL params
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // Fetch customer details from localStorage or API
    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    const selectedCustomer = storedCustomers.find((cust) => cust.id === id);
    if (selectedCustomer) {
      setCustomer(selectedCustomer);
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${customer._id}`);
      navigate('/customers'); // Redirect after delete
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  

  const markAsCompleted = (categoryId) => {
    if (customer) {
      const updatedCategories = customer.categories.map(cat => 
        cat.id === categoryId ? { ...cat, completed: !cat.completed } : cat
      );

      const updatedCustomer = { ...customer, categories: updatedCategories };
      setCustomer(updatedCustomer);

      const allCustomers = JSON.parse(localStorage.getItem('customers')) || [];
      const updatedCustomers = allCustomers.map(cust => (cust.id === id ? updatedCustomer : cust));

      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    }
  };

  if (!customer) return <p>Loading customer details...</p>;

  return (
    <div className="customer-details-container">
      <header className="customer-header">
        <h2>{customer.name}</h2>
        <div className="contact-info">
          <a href={`tel:${customer.phone}`} className="phone-link">📞 {customer.phone}</a>
        </div>
        <button className="add-category-btn" onClick={() => navigate(`/category/${id}`)}>+ Add Item</button>
      </header>

      <div className="category-list">
        {customer.categories.length > 0 ? (
          customer.categories.map((category) => (
            <div key={category.id} className="category-card">
              <img src={category.image} alt={category.name} />
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>Price: ₹{category.price}</p>
                <p>Due Date: {category.dueDate}</p>
                <button className="delete-btn" onClick={() => handleDelete(category.id)}>🗑 Delete</button>
                <label>
                  <input type="checkbox" checked={category.completed} onChange={() => markAsCompleted(category.id)} />
                  Completed
                </label>
              </div>
            </div>
          ))
        ) : (
          <p>No items added yet.</p>
        )}
      </div>

      <div className="financial-summary">
        <p><strong>Total:</strong> ₹{customer.categories.reduce((sum, cat) => sum + cat.price, 0)}</p>
        <p><strong>Paid:</strong> ₹{customer.paid}</p>
        <p><strong>Balance:</strong> ₹{customer.categories.reduce((sum, cat) => sum + cat.price, 0) - customer.paid}</p>
      </div>
    </div>
  );
}

export default CustomerDetails;
