import React, { useState } from 'react';
import './styles/experiencias.css';

import image1 from '../assets/image/image 27.png';
import image2 from '../assets/image/image 25.png';
import image3 from '../assets/image/image 46.png';

export default function Experiencias() {
  const [selectedImage, setSelectedImage] = useState(image2);
  const [quote, setQuote] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
  const [name, setName] = useState("Nombre Apellidos");
  
  const handleImageClick = (imgSrc, quoteText, personName) => {
    setSelectedImage(imgSrc);
    setQuote(quoteText);
    setName(personName);
  };

  return (
    <div className="experiencias">
      <h2>Experiencias</h2>
      <div className="experiencias-grid">
        <div className={`imagen-secundaria ${selectedImage === image1 ? 'selected' : ''}`} onClick={() => handleImageClick(image1, "Texto para imagen 1", "Person 1")}>
          <img src={image1} alt="Grupo de estudiantes en una universidad" />
        </div>
        <div className={`imagen-principal ${selectedImage === image2 ? 'selected' : ''}`} onClick={() => handleImageClick(image2, "Texto para imagen 2", "Person 2")}>
          <img src={image2} alt="Estudiantes sosteniendo una bandera de México" />
        </div>
        <div className={`imagen-secundaria ${selectedImage === image3 ? 'selected' : ''}`} onClick={() => handleImageClick(image3, "Texto para imagen 3", "Person 3")}>
          <img src={image3} alt="Estudiante en un campus universitario" />
        </div>
      </div>
      <div className="cita">
        <p><span className="comillas">“</span>{quote}<span className="comillas">”</span></p>
        <p className="nombre">{name}</p>
      </div>
    </div>
  );
}
