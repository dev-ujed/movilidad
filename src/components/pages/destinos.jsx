import React from 'react'
import Header from './../mainmenu'
import Footer from './../Footer'

import '../styles/destinos.css'

export default function destinos() {
  return (
    <div>
      <Header />

      <main className='destinos container'>
        <div className='destinos-content'>
          <h1>Destinos</h1>
          <p>Selecciona tu carrera para conocer las universidades nacionales e internacionales en las que puedes realizar tus estudios</p>
          <div className='select'>
            <select class="form-select form-select-lg mb-3" aria-label="Default select example">
              <option selected>Escoge tu carrera</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
              <option value="5">Five</option>
              <option value="6">Six</option>
              <option value="7">Seven</option>
              <option value="8">Eight</option>
            </select>
          </div>
        </div>
      
        <div className='info-destinos'>
        </div>
      </main>

      <Footer />
    </div>
  )
}
