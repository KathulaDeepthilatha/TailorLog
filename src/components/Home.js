
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Tailor Shop</h1>
        <button className="menu-button" onClick={() => document.getElementById('menu').classList.toggle('show')}>☰</button>
        <nav id="menu" className="home-menu">
          <ul>
            <li onClick={() => navigate('/customers')}>Customers</li>
            <li onClick={() => navigate('/pending')}>Pending</li>
            <li onClick={() => navigate('/completed')}>Completed</li>
            <li onClick={() => navigate('/history')}>History</li>
          </ul>
        </nav>
      </header>

      <main className="home-body">
        <h2>Add Customer</h2>
        <div className="gender-selection">
          <div className="gender-option">
            <img src="/images/men.png" alt="Men" />
            <button onClick={() => navigate('/add-customer?gender=male')}>Men</button>
          </div>
          <div className="gender-option">
            <img src="/images/women.png" alt="Women" />
            <button onClick={() => navigate('/add-customer?gender=female')}>Women</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
