import React from 'react';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo-icon">
        <div className="bulb">
          <div className="filament">10</div>
        </div>
      </div>
      <div className="logo-text">
        <span className="code">Code</span>
        <span className="lumina">Lumina</span>
      </div>
    </div>
  );
};

export default Logo;