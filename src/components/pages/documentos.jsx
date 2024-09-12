import React from 'react'
import Header from './../mainmenu'
import Footer from './../Footer'
import './../styles/documentos.css'

export default function documentos() {
  return (
    <div>
        <Header />
        <div className='documentos'>
            <h1>Documentos</h1>

            <div className='archivos container'>
                <a href=""><img src={require('../../assets/image/pdf-flat.png')} alt="Icono PDF" />Reglamento Interno del Programa de Movilidad Académica UJED 2024-B</a>
                <a href=""><img src={require('../../assets/image/pdf-flat.png')} alt="Icono PDF" />CONVOCATORIA UJED 2024-B </a>
            </div>

        </div>
        <Footer />
    </div>
  )
}
