
const handleForgotPin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: newPhone,  // User enters new phone number
          newPin: newPin,   // User enters new PIN
        }),
      });
  
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Failed to reset PIN.");
      console.error("Error:", error);
    }
  };
  