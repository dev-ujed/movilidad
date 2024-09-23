import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/header.css';

export default function MainMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = (event) => {
    setIsMenuOpen(!isMenuOpen);
    event.preventDefault();
  };

  const toggleDropdown = (event) => {
    setIsDropdownOpen(!isDropdownOpen);
    event.preventDefault();
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/"><img src={require('../assets/image/Logo2.png')} alt="Logo" className="logoImage" /></a>
      </div>
      <nav className={`nav ${isMenuOpen ? 'is_active' : ''}`}>
        <ul>
        <li><Link to="/">Inicio</Link></li>
        <li>
          <a href="#di" onClick={toggleDropdown}>La Dirección <i className={`fas fa-chevron-down ${isDropdownOpen ? 'rotate' : ''}`}></i></a>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/">Visión/Misión</Link></li>
                <li><Link to="/">Convenios</Link></li>
              </ul>
            )}
          </li>
        <li><a href="/destinos">Destinos</a></li>
        <li><a href="/documentos">Documentos</a></li>
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

