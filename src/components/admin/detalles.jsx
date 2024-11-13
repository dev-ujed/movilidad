import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';

function Detalles() {

    const { matricula } = useParams();
    const [detalle, setDetalle] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
        try {
            const response = await axios.get(`https://movilidadback.ujed.mx/intercambio/procedures/`, { params: { matricula } });
            setDetalle(response.data);
        } catch (error) {
            console.error('Error al obtener detalles:', error);
        }
        };

        fetchDetails();
    }, [matricula]);

  return (
    <div>
      <Typography variant="h4" component="h2" style={{ marginBottom: '20px' }}>Detalle de la Solicitud</Typography>
      <p>ID: {matricula}</p>
    </div>
  )
}

export default Detalles;
