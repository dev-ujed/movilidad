//codigo pasos jsx 
import React from 'react'
import './styles/pasos.css';

const pasosData = [
  {
    numero: '01',
    descripcion: (
      <>
        Leer detenidamente la <a href="/documentos">Convocatoria</a>. Revisar el <a href="/documentos">reglamento</a>, los <a href="/destinos">destinos</a> disponibles, los requisitos y descargar los <a href="/documentos">formatos</a>.
      </>
    ),
  },
  {
    numero: '02',
    descripcion: (
      <>
        Para tener acceso a toda la información DEBES usar tu <span>correo institucional.</span> No podrás hacerlo con correos de gmail o cualquier otro.
      </>
    ),
  },
  {
    numero: '03',
    descripcion: (
      <>
        Una vez que elijas el destino, revisar la oferta académica y elaborar junto con tu Secretario Académico el <span>Proyecto de Equivalencias de Materias.</span>
      </>
    ),
  },
  {
    numero: '04',
    descripcion: (
      <>
        Te aconsejamos empezar por presentar el <span>Examen Psicométrico</span> que puede tomar un poco más de tiempo que el resto de los requisitos.
      </>
    ),
  },
  {
    numero: '05',
    descripcion: (
      <>
        Ir <span>integrando tu expediente</span> en físico en el orden que viene detallado en la Convocatoria. Puedes crear un “checklist” para que vayas teniendo control de lo que te falta.
      </>
    ),
  },
  {
    numero: '06',
    descripcion: (
      <>
        Si tienes alguna duda en específico sobre tu trámite nos puedes enviar un correo a <span>nacional@ujed.mx</span> o <span>internacional@ujed.mx</span> según el tipo de movilidad.
      </>
    ),
  },
  {
    numero: '07',
    descripcion: (
      <>
        Cuando tengas todo listo, deberás <span>subir tu expediente</span> en el enlace que se te proporcione en la convocatoria. No aceptamos expedientes en físico. Y listo, después de esto a esperar instrucciones. ¡Mucho éxito!
      </>
    ),
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
            <p>{paso.descripcion}</p>
            {paso.links && (
              <p>
                {paso.links.map((link, linkIndex) => (
                  <React.Fragment key={linkIndex}>
                    <a href={link.url} className="paso-link">
                      {link.text}
                    </a>
                    {linkIndex < paso.links.length - 1 ? ', ' : ''}
                  </React.Fragment>
                ))}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
