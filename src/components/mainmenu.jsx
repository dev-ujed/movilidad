import React, { useState } from 'react';
import './styles/header.css';

export default function MainMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (event) => {
    setIsMenuOpen(!isMenuOpen);
    event.preventDefault();
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={require('../assets/image/logo.png')} alt="Logo" className="logoImage" />
      </div>
      <nav className={`nav ${isMenuOpen ? 'is_active' : ''}`}>
        <ul>
          <li><a href="#i">Inicio</a></li>
          <li><a href="#di">La Dirección</a></li>
          <li><a href="#de">Destinos</a></li>
          <li><a href="#d">Documentos</a></li>
        </ul>
      </nav>
      <div className={`hamburger ${isMenuOpen ? 'is-active' : ''}`} onClick={toggleMenu}>
        <div className="layer top"></div>
        <div className="layer mid"></div>
        <div className="layer bottom"></div>
      </div>
    </header>
  );
}

