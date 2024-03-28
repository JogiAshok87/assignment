import React, { useState, } from 'react';
import {NavLink} from 'react-router-dom'
import './index.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
 

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  

  return (
    <div className={`side-navbar ${isOpen ? 'open' : ''}`}>
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
        <h2>Carbon Cell</h2>
      </div>
      <div className="search-bar">
      
        <input type="text" placeholder="Search" />
      </div>
      <ul className="nav-items">
        <li><NavLink exact={true.toString()} to="/" ><i className="fa fa-home"></i>Home</NavLink></li>
        <li><NavLink to="/Organization" ><i className="fa fa-building"></i> Organization</NavLink></li>
        <li ><NavLink to="/Assets" ><i className="fa fa-cubes"></i> Assets</NavLink></li>
        <li>
          <i className="fa fa-exchange"></i> Trade
        </li>
        <li >
          <i className="fa fa-history"></i> History
        </li>
        <li >
          <i className="fa fa-wallet"></i> Wallet
        </li>
        <li >
          <i className="fa fa-bell"></i> Notifications
          <span className="notification-count">2</span>
        </li>
        <li >
          <i className="fa fa-question-circle"></i> Support
        </li>
        <li >
          <i className="fa fa-cog"></i> Settings
        </li>
      </ul>
      <div className="user-info">
        <img src="./img1.png" alt="Profile" />
        <div className="user-details">
          <h3>Brooklyn Simmons</h3>
          <p>brooklyn@simmons.com</p>
        </div>
        
      </div>
      <button className="hamburger-menu" onClick={toggleNavbar}>
        <i className="fa fa-bars"></i>
      </button>
    </div>
  );
};

export default Sidebar