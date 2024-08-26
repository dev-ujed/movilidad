import React from 'react';
import logoUjed from '../assets/image/Logo UJED.png';
import logo from '../assets/image/logo.png';
import './styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <img src={logo} alt="Dirección de Internacionalización logo" />
          </div>
          <p>
            Blvd. Guadiana s/n. Fracc. Los Remedios. 
            A un costado de la Biblioteca Central de la UJED.
          </p>
          <a href="https://goo.gl/maps/xyz" target="_blank" rel="noopener noreferrer">Ver mapa →</a>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <p><a href="mailto:bienvenidos@ujed.mx">bienvenidos@ujed.mx</a></p>
          <p><a href="tel:+526188271202">618 827 1202</a></p>
        </div>
        <div className="footer-section">
          <h3>Redes sociales</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/ujed" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/ujed" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <img src={logoUjed} alt="UJED Logo" className="footer-logo" />
        <p>UJED - Universidad Juárez del Estado de Durango</p>
      </div>
    </footer>
  );
}