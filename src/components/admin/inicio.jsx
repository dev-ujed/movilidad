import React from 'react'
import Typography from '@mui/material/Typography';

function Inicio() {
  return (
    <div>
        <Typography variant="h5" component="h5">Bienvenido(a) </Typography>
        <div style={{marginTop: '20px'}}>
            <p>Utiliza el menú para acceder a las áreas del sitio en donde puedes realizar cambios o consultar información.</p>
            <p>No olvides cerrar la sesión (en la parte superior derecha de esta pantalla) antes de cerrar la pestaña o si vas a estar alejado de tu computadora o dispositivo.</p>
        </div>
    </div>
  )
}

export default Inicio;