import React, { useState, useEffect } from 'react';
import Header from './../mainmenu';
import Footer from './../Footer';
import '../styles/destinos.css';

export default function Destinos() {
  const [carreras, setCarreras] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState('');

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/program-estudios/carreras/');
        const data = await response.json();
        console.log('Datos de carreras:', data);
        setCarreras(data);
      } catch (error) {
        console.error('Error al obtener las carreras:', error);
      }
    };

    fetchCarreras();
  }, []);

  useEffect(() => {
    const fetchUniversidades = async () => {
      if (selectedCarrera) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/program-estudios/mov-carreras/?carrera_id=${selectedCarrera}&disponible=true`);
          const data = await response.json();
          console.log('Datos de universidades:', data);
          // Asumiendo que data es un array de objetos con escuelas_mov
          const universidadesData = data.flatMap(item => item.escuelas_mov);
          console.log('Universidades a establecer en el estado:', universidadesData);
          setUniversidades(universidadesData);
        } catch (error) {
          console.error('Error al obtener universidades:', error);
        }
      }
    };

    fetchUniversidades();
  }, [selectedCarrera]);

  const handleCarreraChange = (event) => {
    setSelectedCarrera(event.target.value);
  };

  // Encuentra el nombre de la carrera seleccionada
  const selectedCarreraObj = carreras.find(carrera => carrera.id === parseInt(selectedCarrera));

  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  };
  
  const icons = importAll(require.context('../../assets/image/banderas/', false, /\.(png)$/));

  return (
    <div>
      <Header />
      <div className='main'>
        <main className='destinos container'>
          <div className='destinos-content'>
            <h1>Destinos</h1>
            <p>Selecciona tu carrera para conocer las universidades nacionales e internacionales en las que puedes realizar tus estudios</p>
            <div className='select'>
              <select className="form-select form-select-lg mb-3" aria-label="Default select example" onChange={handleCarreraChange}>
                <option value="">Escoge tu carrera</option>
                {carreras.map(carrera => (
                  <option key={carrera.id} value={carrera.id}>
                    {carrera.carrera}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </main>
        <div className='info-destinos container'>
            <div className='info-destinos-content'>
              {selectedCarrera && universidades.length > 0 ? (
                <>
                  <div className='universidades'>
                    <h3>Nacionales</h3>
                    {universidades.filter(univ => univ.tipo === 'Nacional').length > 0 ? (
                    universidades
                      .filter(univ => univ.tipo === 'Nacional')
                      .map(universidad => (
                        <div key={universidad.id} className='universidad'>
                          <img className='imgPais' src={icons[`${universidad.pais}.png`]} alt={`Icono ${universidad.pais}`} />
                          <a href={universidad.pagina_web}>{universidad.nombre}</a>
                        </div>
                      ))

                    ) : (<p className='titulo'>No hay universidades nacionales para la carrera seleccionada.</p>)}
                  </div>
                  <div className='universidades'>
                    <h3>Internacionales</h3>
                    {universidades.filter(univ => univ.tipo === 'Internacional').length > 0 ? (
                    universidades
                      .filter(univ => univ.tipo === 'Internacional')
                      .map(universidad => (
                        <div key={universidad.id} className='universidad'>
                          <img className='imgPais' src={icons[`${universidad.pais}.png`]} alt={`Icono ${universidad.pais}`} />
                          <p>{universidad.pais}</p>
                          <a href={universidad.pagina_web}>{universidad.nombre}</a>
                        </div>
                      ))

                    ) : (<p className='titulo'>No hay universidades internacionales para la carrera seleccionada.</p>)}
                  </div>
                </>
              ) : (
                <p className='titulo'>Destinos para la carrera <span>{selectedCarreraObj ? selectedCarreraObj.carrera : 'Selecciona una carrera'}</span></p>
              )}
            </div>
          </div>
      </div>
      <Footer />
    </div>
  );
}
