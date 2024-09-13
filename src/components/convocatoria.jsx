import React, { useState, useEffect } from 'react';
import './styles/convocatorias.css';

import image1 from '../assets/image/FB_IMG_1718396208572.jpg';
import image2 from '../assets/image/Call.png';

const convocatoriasData = [
  {
      imageSrc: image1,
    },
    {
      imageSrc: image2,
    },
    {
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4bnP9PSROxUz9K6-T56xf6NWWppg_4gRkWTTD8MUe7HKoDLzZBtPv0mgzvSd1yrk_yY&usqp=CAU',
    },
    {
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4bnP9PSROxUz9K6-T56xf6NWWppg_4gRkWTTD8MUe7HKoDLzZBtPv0mgzvSd1yrk_yY&usqp=CAU',
    },
    {
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4bnP9PSROxUz9K6-T56xf6NWWppg_4gRkWTTD8MUe7HKoDLzZBtPv0mgzvSd1yrk_yY&usqp=CAU',
    },
    {
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

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="convocatorias">
      <h2>Convocatorias</h2>
      {isMobile ? (
        <div className="carousel">
          <div className="carousel-content">
            <Convocatoria {...convocatoriasData[currentSlide]} />
          </div>
          <div className="indicators">
            {convocatoriasData.map((_, index) => (
              <div
                key={index}
                className={`indicator ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
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