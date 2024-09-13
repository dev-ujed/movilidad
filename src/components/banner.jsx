// Banner.jsx
import React, { useState, useEffect } from 'react';
import './styles/banner.css';

function getRandomImage(images) {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

const images = require.context('../assets/FOTOS', false, /\.(png|jpe?g|svg)$/);
const imageFiles = images.keys().map(images);

export default function Banner() {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const usedImages = new Set();
    const getUniqueRandomImage = () => {
      let availableImages = imageFiles.filter(image => !usedImages.has(image));
      if (availableImages.length === 0) {
        usedImages.clear();
        availableImages = imageFiles;
      }
      const randomImage = getRandomImage(availableImages);
      usedImages.add(randomImage);
      return randomImage;
    };

    const newSelectedImages = [];
    for (let i = 0; i < 16; i++) {
      newSelectedImages.push(getUniqueRandomImage());
    }
    setSelectedImages(newSelectedImages);
  }, []);

  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Estudia en el extranjero</h1>
        <p>Conoce las diferentes universidades nacionales e internacionales en las que puedes estudiar mediante el programa de intercambio académico de la UJED</p>
        <a href="/destinos">Ver destinos</a>
      </div>
      <div className="banner-images">
        {[0, 1, 2].map((columnIndex) => (
          <div key={columnIndex} className="column">
            {selectedImages.slice(columnIndex * 3, (columnIndex + 1) * 4).map((image, imgIndex) => (
              <img key={imgIndex} src={image} alt={`Image ${columnIndex * 3 + imgIndex + 1}`} className="banner-image" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}