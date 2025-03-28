import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
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
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/add-customer" element={<PrivateRoute><AddCustomer /></PrivateRoute>} />
        <Route path="/category" element={<PrivateRoute><Category /></PrivateRoute>} />
        <Route path="/measurements" element={<PrivateRoute><Measurements /></PrivateRoute>} />
        <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
        <Route path="/customer-details/:id" element={<PrivateRoute><CustomerDetails /></PrivateRoute>} />
        <Route path="/pending" element={<PrivateRoute><Pending /></PrivateRoute>} />
        <Route path="/completed" element={<PrivateRoute><Completed /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;