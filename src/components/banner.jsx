// Banner.jsx
import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
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

  const breakpointColumnsObj = {
    default: 3,  // 3 columnas en pantallas grandes
    1100: 2,     // 2 columnas en pantallas medianas
  };

  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Estudia en el extranjero</h1>
        <p>Conoce las diferentes universidades nacionales e internacionales en las que puedes estudiar mediante el programa de intercambio académico de la UJED</p>
        <a href="/destinos">Ver destinos</a>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="banner-images my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {selectedImages.map((image, index) => (
          <div key={index} className="image-container">
            <img src={image} alt={`Banner image ${index}`} style={{ width: '100%', display: 'block' }} />
          </div>
        ))}
      </Masonry>
    </div>
  );
}