import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🔒 Fraud Detection
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/transactions" className="nav-link">Transactions</Link>
          </li>
          <li className="nav-item">
            <Link to="/analytics" className="nav-link">Analytics</Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
