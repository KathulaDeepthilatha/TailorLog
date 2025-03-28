import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Category.css';

function Category() {
  const navigate = useNavigate();
  const location = useLocation();
  const [customer, setCustomer] = useState(null);
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const categories = {
    male: ['Shirt', 'Pant', 'Suit'],
    female: ['Skirt', 'Blouse', 'Gown'],
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/customers/latest')
      .then(response => {
        if (response.data) {
          setCustomer(response.data);
        } else {
          navigate('/add-customer'); // Redirect if no customer found
        }
      })
      .catch(error => {
        console.error("Error fetching latest customer:", error);
        navigate('/add-customer');
      });
  }, [navigate]);
  

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAndNext = () => {
    if (category && image) {
      const categoryData = { category, image, customerId: customer._id };
      axios.post('http://localhost:5000/api/categories/add', categoryData)
        .then(response => {
          console.log("Category saved:", response.data);
          navigate('/measurements'); // Navigate after saving category
        })
        .catch(error => {
          console.error("Error saving category:", error);
          alert("Failed to save category. Try again.");
        });
    } else {
      alert('Please select a category and capture an image.');
    }
  };

  return (
    <div className="category-container">
      <h2>Select Category for {customer?.name || 'Loading...'}</h2>
      <select onChange={handleCategoryChange} value={category}>
        <option value="">Select a category</option>
        {categories[customer?.gender]?.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>

      <div className="image-capture">
        <input type="file" accept="image/*" capture="environment" onChange={handleCapture} />
        {image && <img src={image} alt="Captured" />}
      </div>

      <div className="category-buttons">
        <button onClick={() => navigate('/add-customer')}>Back</button>
        <button onClick={handleSaveAndNext}>Save & Next</button>
      </div>
    </div>
  );
}

export default Category;
