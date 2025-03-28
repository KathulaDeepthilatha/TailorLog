
// Frontend: src/components/Measurements.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Measurements.css';

function Measurements() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Extract customer and category details from query params
  const customerName = queryParams.get('customerName') || 'Unknown Customer';
  const category = queryParams.get('category') || 'Unknown Category';

  // Default measurement fields
  const defaultMeasurements = {
    shoulder: '',
    chest: '',
    waist: '',
    hip: '',
    sleeveLength: '',
    pantLength: '',
    finalAmount: ''
  };

  const [measurements, setMeasurements] = useState(defaultMeasurements);

  useEffect(() => {
    // Load existing measurements if editing
    const storedData = JSON.parse(localStorage.getItem('measurements')) || {};
    if (storedData[customerName] && storedData[customerName][category]) {
      setMeasurements(storedData[customerName][category]);
    }
  }, [customerName, category]);

  const handleChange = (e) => {
    setMeasurements({ ...measurements, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save the measurements in local storage or API
    const storedData = JSON.parse(localStorage.getItem('measurements')) || {};
    
    if (!storedData[customerName]) {
      storedData[customerName] = {};
    }

    storedData[customerName][category] = measurements;
    localStorage.setItem('measurements', JSON.stringify(storedData));

    alert('Measurements saved successfully!');
    setTimeout(() => navigate('/customers'), 1000); // Redirect after saving
  };

  return (
    <div className="measurements-container">
      <h2>Measurements for {category}</h2>
      <h3>Customer: {customerName}</h3>

      <div className="measurement-list">
        {Object.keys(defaultMeasurements).map((key) => (
          <div key={key} className="measurement-item">
            <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
            <input
              type="text"
              name={key}
              value={measurements[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
      </div>

      <div className="button-group">
        <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default Measurements;
