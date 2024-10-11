import React, { useState } from 'react';
import './styles/experiencias.css';

import image1 from '../assets/image/exp1.jpg';
import image2 from '../assets/image/exp2.jpe';
import image3 from '../assets/FOTOS/Roma (2).jpeg';

export default function Experiencias() {
  const [selectedImage, setSelectedImage] = useState(image2);
  const [quote, setQuote] = useState("El hecho de irme de movilidad para mí fue un reto el cual estoy emocionado de haber culminado de forma exitosa, el adaptarse a costumbres de un lugar que no conocía fue un poco complicado, realizar movilidad es una experiencia muy agradable que recomiendo por que me gusto conocer nuevos lugares, personas, gastronomía etc.considero que fue demasiado útil para reforzar habilidades personales y estoy muy contento con los conocimientos adquiridos.");
  const [name, setName] = useState("RODRÍGUEZ ZAMORA IRVING");
  
  const images = [
    {
      src: image1,
      quote: "Hacer movilidad ha sido, por mucho, una de las mejores experiencias de mi vida, sino es que la número uno. Me permitió conocer otros países, otro continente, un nuevo sistema educativo y gente increíble, pero sobretodo me dio la oportunidad de conocerme a mi misma y ver a hasta dónde se puede llegar luchando por tus sueños.",
      name: "NIEVES HERNANDEZ LESLIE"
    },
    {
      src: image2,
      quote: "El hecho de irme de movilidad para mí fue un reto el cual estoy emocionado de haber culminado de forma exitosa, el adaptarse a costumbres de un lugar que no conocía fue un poco complicado, realizar movilidad es una experiencia muy agradable que recomiendo por que me gusto conocer nuevos lugares, personas, gastronomía etc.considero que fue demasiado útil para reforzar habilidades personales y estoy muy contento con los conocimientos adquiridos.",
      name: "RODRÍGUEZ ZAMORA IRVING"
    },
    {
      src: image3,
      quote: "La parte que más reconozco de toda esta experiencia es que conocí muchísimas personas, todas de distintas nacionalidades, y ahora puedo decir que tengo amigos en España, Francia, Portugal, Uruguay, Italia y Polonia, algo que jamás pensé que podría decir, y que realmente me emociona mucho.",
      name: "RODRÍGUEZ GARCÍA ANA SOFÍA"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (imgSrc, quoteText, personName) => {
    setSelectedImage(imgSrc);
    setQuote(quoteText);
    setName(personName);
  };

  return (
    <div className="experiencias-m">
      <h2>Experiencias</h2>
      <div className="slider">
        <button className="prev" onClick={handlePrev}>‹</button>
        <div className="slider-content">
          <div className="imagen-principal">
            <img src={images[currentIndex].src} alt={images[currentIndex].name} />
          </div>
          <div className="cita">
            <p><span className="comillas">“</span>{images[currentIndex].quote}<span className="comillas">”</span></p>
            <p className="nombre">{images[currentIndex].name}</p>
          </div>
        </div>
        <button className="next" onClick={handleNext}>›</button>
      </div>

      <div className='experiencias'>
      <div className="experiencias-grid">
        <div className={`imagen-secundaria ${selectedImage === image1 ? 'selected' : ''}`} onClick={() => handleImageClick(image1, "Hacer movilidad ha sido, por mucho, una de las mejores experiencias de mi vida, sino es que la número uno. Me permitió conocer otros países, otro continente, un nuevo sistema educativo y gente increíble, pero sobretodo me dio la oportunidad de conocerme a mi misma y ver a hasta dónde se puede llegar luchando por tus sueños.", "NIEVES HERNANDEZ LESLIE")}>
          <img src={image1} alt="Grupo de estudiantes en una universidad" />
        </div>
        <div className={`imagen-principal ${selectedImage === image2 ? 'selected' : ''}`} onClick={() => handleImageClick(image2, "El hecho de irme de movilidad para mí fue un reto el cual estoy emocionado de haber culminado de forma exitosa, el adaptarse a costumbres de un lugar que no conocía fue un poco complicado, realizar movilidad es una experiencia muy agradable que recomiendo por que me gusto conocer nuevos lugares, personas, gastronomía etc.considero que fue demasiado útil para reforzar habilidades personales y estoy muy contento con los conocimientos adquiridos.", "RODRÍGUEZ ZAMORA IRVING")}>
          <img src={image2} alt="Estudiantes sosteniendo una bandera de México" />
        </div>
        <div className={`imagen-secundaria ${selectedImage === image3 ? 'selected' : ''}`} onClick={() => handleImageClick(image3, "La parte que más reconozco de toda esta experiencia es que conocí muchísimas personas, todas de distintas nacionalidades, y ahora puedo decir que tengo amigos en España, Francia, Portugal, Uruguay, Italia y Polonia, algo que jamás pensé que podría decir, y que realmente me emociona mucho.", "RODRÍGUEZ GARCÍA ANA SOFÍA")}>
          <img src={image3} alt="Estudiante en un campus universitario" />
        </div>
      </div>
      <div className="cita">
        <p><span className="comillas">“</span>{quote}<span className="comillas">”</span></p>
        <p className="nombre">{name}</p>
      </div>
      </div>
    </div>
    
  );
}
