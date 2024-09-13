import React from 'react';
import logoUjed from '../assets/image/Logo UJED.png';
import logo from '../assets/image/logo.png';
import './styles/footer.css';

export default function Footer() {
  return (

    <div className="">
      <footer className='footer'>
        <div className= "p-4 d-flex flex-column flex-lg-row justify-content-center">
          <div className='d-flex flex-column flex-lg-row justify-content-center my-4'>
            <div className='logo col-lg-3 col-md-6 mb-4 mb-md-0 text-center'>
              <img src={logo} alt="Dirección de Internacionalización logo" />
            </div>
            <div className='footer-section col-lg-3 col-md-6 mb-4 mb-md-0'>
              <h3 className='mb-4'>Dirección</h3>
              <p className='direccion'>Blvd. Guadiana s/n. Fracc. Los Remedios. A un costado de la Biblioteca Central de la UJED.</p>
              <a className='verMapa' href="https://maps.app.goo.gl/nWC5NxWMSrBB56yf7" target="_blank" rel="noopener noreferrer">Ver mapa →</a>
            </div>
            <div className='footer-section col-lg-3 col-md-6 mb-4 mb-md-0'>
              <h3 className='mb-4'>Contacto</h3>
              <ul className='list-unstyled contact-icons'>
                <li className='mb-2'><a href=""><i className="fa-regular fa-envelope"></i>nacional@ujed.mx</a></li>
                <li className='mb-2'><a href="tel:+526188271202"><i className="fa-solid fa-phone"></i>618 827 1202</a></li>
              </ul>
            </div>
            <div className='footer-section col-lg-3 col-md-6 mb-4 mb-md-0'>
              <h3 className='mb-4'>Redes sociales</h3>
              <ul className='social-icons list-unstyled d-flex flex-row justify-content-center justify-content-lg-start'>
                <li><a className="text-white px-2" href="https://www.instagram.com/ujed_oficial?igsh=M3hhY3Y4ZW44eWhl" target="_blank"><i className="fa-brands fa-instagram"></i></a></li>
                <li><a className="text-white px-2" href="https://www.facebook.com/profile.php?id=100049071859082&mibextid=ZbWKwL" target="_blank"><i className="fa-brands fa-facebook"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-bottom d-flex flex-row justify-content-center">
        <img src={logoUjed} alt="UJED Logo" className="footer-logo" />
      </div>
    </div>



    /*<footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <img src={logo} alt="Dirección de Internacionalización logo" />
          </div>
        </div>
        <div className="footer-section">
          <h3>Dirección</h3>
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
      </div>
    </footer>*/
  );
}