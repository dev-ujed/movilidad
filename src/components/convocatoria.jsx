import React, { useState, useEffect } from 'react';
import './styles/convocatorias.css';

const convocatoriasData = [
  {
      title: 'Semana de la Internacionalización',
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4bnP9PSROxUz9K6-T56xf6NWWppg_4gRkWTTD8MUe7HKoDLzZBtPv0mgzvSd1yrk_yY&usqp=CAU',
    },
    {
      title: 'Programa 2023-B',
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4bnP9PSROxUz9K6-T56xf6NWWppg_4gRkWTTD8MUe7HKoDLzZBtPv0mgzvSd1yrk_yY&usqp=CAU',
    },
    {
      title: 'Movilidad Académica',
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4bnP9PSROxUz9K6-T56xf6NWWppg_4gRkWTTD8MUe7HKoDLzZBtPv0mgzvSd1yrk_yY&usqp=CAU',
    },
    {
      title: 'Becas Parciales de Estudio en Brasil',
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4bnP9PSROxUz9K6-T56xf6NWWppg_4gRkWTTD8MUe7HKoDLzZBtPv0mgzvSd1yrk_yY&usqp=CAU',
    },
    {
      title: 'Internacionalización UJED',
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4bnP9PSROxUz9K6-T56xf6NWWppg_4gRkWTTD8MUe7HKoDLzZBtPv0mgzvSd1yrk_yY&usqp=CAU',
    },
    {
      title: 'nose ',
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4bnP9PSROxUz9K6-T56xf6NWWppg_4gRkWTTD8MUe7HKoDLzZBtPv0mgzvSd1yrk_yY&usqp=CAU',   
    },
];

const Convocatoria = ({ title, imageSrc }) => {
  return (
    <div className="convocatoria">
      <img src={imageSrc} alt={title} className="convocatoria-image" />
      <h3 className="convocatoria-title">{title}</h3>
    </div>
  );
};

const handleClick = () => {
  alert('¡Ver destinos!');
};

export default function ConvocatoriasContainer() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 393);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 393);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % convocatoriasData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + convocatoriasData.length) % convocatoriasData.length);
  };

  return (
    <div className="convocatorias">
      <h2>Convocatorias</h2>
      {isMobile ? (
        <div className="carousel">
          <button onClick={prevSlide} className="arrow left">&lt;</button>
          <div className="carousel-content">
            <Convocatoria {...convocatoriasData[currentSlide]} />
          </div>
          <button onClick={nextSlide} className="arrow right">&gt;</button>
        </div>
      ) : (
        <div className="convocatorias-grid" onClick={handleClick}>
          {convocatoriasData.map((convocatoria, index) => (
            <Convocatoria key={index} {...convocatoria} />
          ))}
        </div>
      )}
    </div>
  );
}