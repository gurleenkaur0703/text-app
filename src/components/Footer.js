import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';


const Footer = ({ darkMode }) => {
  const footerStyle = {
    backgroundColor: darkMode ? '#2e3c5d' : '#e9ecef', // deep blue-gray for dark
    color: darkMode ? '#f0f0f0' : '#000',
    transition: 'all 0.3s ease',
  };

  const linkStyle = {
    margin: '0 10px',
    color: darkMode ? '#90caf9' : '#007bff',
    textDecoration: 'none',
  };

  return (
    
<footer className="text-center py-4 mt-5" style={footerStyle}>
  <p className="mb-1">
    Made with ❤️ by<strong>
      <a href="https://gurleenkaur26.netlify.app/" target="_blank" rel="noreferrer" style={linkStyle}>
        Gurleen Kaur
      </a>
    </strong>
  </p>
  <div style={{ fontSize: '24px' }}>
    <a href="https://github.com/gurleenkaur0703" target="_blank" rel="noreferrer" style={linkStyle}>
      <FaGithub />
    </a>
    <a href="https://linkedin.com/in/gurleenkaur0703" target="_blank" rel="noreferrer" style={linkStyle}>
      <FaLinkedin />
    </a>
    <a href="mailto:kaurgurleen.gk26@gmail.com" style={linkStyle}>
      <FaEnvelope />
    </a>
  </div>
</footer>

  );
};

export default Footer;
