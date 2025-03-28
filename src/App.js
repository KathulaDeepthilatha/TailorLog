import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import AddCustomer from './components/AddCustomer';
import Category from './components/Category';
import Measurements from './components/Measurements';
import CustomerDetails from './components/CustomerDetails';
import Customers from './components/Customers';
import Pending from './components/Pending';
import Completed from './components/Completed';
import History from './components/History';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/category" element={<Category />} />
        <Route path="/measurements" element={<Measurements />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customer-details/:id" element={<CustomerDetails />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
