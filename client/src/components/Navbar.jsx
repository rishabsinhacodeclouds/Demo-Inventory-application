import React from 'react';
import { Link } from 'react-router-dom';

const navStyle = {
  backgroundColor: '#333',
  padding: '10px',
  color: 'white',
};

const Navbar = () => {
  return (
    <nav style={navStyle}>
      <ul style={{ listStyleType: 'none', padding: 0, display: 'flex' }}>
        <li style={{ marginRight: '20px' }}><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
