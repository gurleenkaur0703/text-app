import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, toggleTheme }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navbarStyle = {
    backgroundColor: darkMode ? '#3f51b5' : '#28a745',  // purple in dark, green in light
    color: darkMode ? '#ffffff' : '#ffffff',
    transition: 'background-color 0.3s ease',
  };

  return (
    <nav className="navbar navbar-expand-lg px-4 py-2" style={navbarStyle}>
      <Link className="navbar-brand fw-bold text-decoration-none" to="/" style={{ color: 'inherit' }}><h4><b>✍️TypeTool</b></h4></Link>

      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${isCollapsed ? 'show' : ''}`}>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link text-decoration-none" to="/about" style={{ color: 'inherit' }}><h5>About</h5></Link>
          </li>
        </ul>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="themeSwitch"
            checked={darkMode}
            onChange={toggleTheme}
          />
          <label className="form-check-label ms-2" htmlFor="themeSwitch" style={{ color: 'inherit' }}><h5> {darkMode ? "🌙 Dark Mode" : "🌞 Light Mode"}</h5>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
