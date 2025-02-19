import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.sidebar') && !event.target.closest('.toggle-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? 'X' : '☰'}
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>My Portfolio</h2>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
          <li><Link to="/about-me" onClick={toggleSidebar}>About Me</Link></li>
          <li><Link to="/projects" onClick={toggleSidebar}>Projects</Link></li>
          <li><Link to="/contact" onClick={toggleSidebar}>Contact</Link></li>
        </ul>
        <div className="bottom-buttons">
          <button className="extras-button">Extras</button>
          <button className="settings-button">
            <i className="fas fa-cog"></i>
            <span className="tooltip">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;