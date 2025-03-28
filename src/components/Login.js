import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Router navigation function

  const API_URL = "http://localhost:5000/api/auth/login"; // Replace with your actual backend URL

  const handleLogin = async () => {
    setError(""); // Clear previous errors

    if (!phoneNumber || !pin) {
      setError("Please enter both phone number and PIN.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, pin }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful");
        localStorage.setItem("authToken", data.token); // Store token
        navigate("/home"); // Navigate to home page
      } else {
        setError(data.message || "Invalid phone number or PIN.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mb-6">
        <img src="/logo.png" alt="Tailor Shop Logo" className="w-20 h-20" />
        <h1 className="text-2xl font-bold mt-2">Tailor Shop</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />

        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
