//codigo pasos jsx 
import React from 'react'
import './styles/pasos.css';

const pasosData = [
  {
    numero: '01',
    descripcion: 'Leer detenidamente la Convocatoria. Revisar el reglamento, los destinos disponibles, los requisitos y descargar los formatos.',
    link: 'Convocatoria'
  },
  {
    numero: '02',
    descripcion: 'Para tener acceso a toda la información DEBES usar tu correo institucional. No podrás hacerlo con correos de gmail o cualquier otro.',
  },
  {
    numero: '03',
    descripcion: 'Una vez que elijas el destino, revisar la oferta académica y elaborar junto con tu Secretario Académico el Proyecto de Equivalencias de Materias.',
  },
  {
    numero: '04',
    descripcion: 'Te aconsejamos empezar por presentar el Examen Psicométrico que puede tomar un poco más de tiempo que el resto de los requisitos.',
  },
  {
    numero: '05',
    descripcion: 'Ir integrando tu expediente en físico en el orden que viene detallado en la Convocatoria. Puedes crear un “checklist” para que vayas teniendo control de lo que te falta.',
  },
  {
    numero: '06',
    descripcion: 'Si tienes alguna duda en específico sobre tu trámite nos puedes enviar un correo a nacional@ujed.mx o internacional@ujed.mx según el tipo de movilidad.',
  },
  {
    numero: '07',
    descripcion: 'Cuando tengas todo listo, deberás subir tu expediente en el enlace que se te proporcione en la convocatoria. No aceptamos expedientes en físico. Y listo, después de esto a esperar instrucciones. ¡Mucho éxito!',
  },
];

export default function Pasos() {
  return (
    <div className="pasos container">
      <h2>¿Cómo empiezo mi trámite de movilidad?</h2>
      <div className="pasos-grid">
        {pasosData.map((paso, index) => (
          <div key={index} className={`paso-item ${index % 2 === 0 ? 'right' : 'left'}`}>
            <h3><span className="numero">{paso.numero}</span></h3>
            <p>{paso.descripcion} {paso.link && <a href="#">{paso.link}</a>}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
