import React, { useState, useEffect } from 'react';
import '../styles/Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (isOpen && !event.target.closest('.sidebar') && !event.target.closest('.toggle-button')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
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
          <li><button onClick={() => document.getElementById('about-me').scrollIntoView()}>About Me</button></li>
          <li><button onClick={() => document.getElementById('projects').scrollIntoView()}>Projects</button></li>
          <li><button onClick={() => document.getElementById('contact').scrollIntoView()}>Contact</button></li>
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