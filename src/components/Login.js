
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

function Login() {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneInput,  // User enters phone
          pin: pinInput,      // User enters Pin
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Login failed.");
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="password" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} />
      {error && <p className="error-text">{error}</p>}
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => alert('Reset PIN feature coming soon!')}>Forgot PIN?</button>
    </div>
  );
}

export default Login;
