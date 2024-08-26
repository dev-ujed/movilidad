import React from 'react';
import './styles/experiencias.css';


import image1 from '../assets/image/image 27.png';
import image2 from '../assets/image/image 25.png';
import image3 from '../assets/image/image 46.png';

export default function Experiencias() {
  return (
    <div className="experiencias">
      <h2>Experiencias</h2>
      <div className="experiencias-grid">
        <div className="imagen-secundaria">
          <img src={image1} alt="Grupo de estudiantes en una universidad" />
        </div>
        <div className="imagen-principal">
          <img src={image2} alt="Estudiantes sosteniendo una bandera de México" />
        </div>
        <div className="imagen-secundaria">
          <img src={image3} alt="Estudiante en un campus universitario" />
        </div>
      </div>
      <div className="cita">
        <p><span className="comillas">“</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<span className="comillas">”</span></p>
        <p className="nombre">Nombre Apellidos</p>
      </div>
    </div>
  );
}
