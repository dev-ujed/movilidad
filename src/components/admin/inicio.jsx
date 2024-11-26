import React from 'react'
import Typography from '@mui/material/Typography';

function Inicio() {

  const user = JSON.parse(localStorage.getItem('user')) || {};
  const lastLogin = user.last_login;
  const date = new Date(lastLogin);

  const options = {
    wekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  };

  const formattedDate = date.toLocaleDateString('es-ES', options);

  return (
    <div>
        <Typography variant="h5" component="h5">Bienvenido(a) {user.first_name} {user.last_name} </Typography>
        <div style={{marginTop: '20px', background: '#fbfcc6', padding: '10px'}}>
          <p><span style={{fontWeight: 'bold'}}>Correo:</span> {user.email}</p>
          <p><span>Ultimo acceso:</span> {formattedDate}</p>
        </div>
        <div style={{marginTop: '20px'}}>
            <p>Utiliza el menú para acceder a las áreas del sitio en donde puedes realizar cambios o consultar información.</p>
            <p>No olvides cerrar la sesión (en la parte superior derecha de esta pantalla) antes de cerrar la pestaña o si vas a estar alejado de tu computadora o dispositivo.</p>
        </div>
    </div>
  )
}

export default Inicio;