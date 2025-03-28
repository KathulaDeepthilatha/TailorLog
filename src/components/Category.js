
// Frontend: src/components/Category.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Category.css';

function Category() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const categories = {
    male: ['Shirt', 'Pant', 'Suit'],
    female: ['Skirt', 'Blouse', 'Gown'],
  };

  useEffect(() => {
    const storedCustomer = JSON.parse(localStorage.getItem('customerData'));
    if (storedCustomer) {
      setCustomer(storedCustomer);
    } else {
      navigate('/add-customer');
    }
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
      const categoryData = { category, image };
      localStorage.setItem('categoryData', JSON.stringify(categoryData));
      navigate('/measurements');
    } else {
      alert('Please select a category and capture an image.');
    }
  };

  return (
    <div className="category-container">
      <h2>Select Category for {customer?.name}</h2>
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
