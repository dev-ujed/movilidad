import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconoPDF from './../../assets/image/pdf-flat.png';

function createData(name) {
  return { name };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
];

function Detalles() {
  const { matricula } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [files, setFiles] = useState([]);

  

  //Info de procedures
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://movilidadback.ujed.mx/intercambio/procedures/`, { params: { matricula } });

        if(response.data.length > 0){
          const details = response.data[0]; 
          setDetalle(details);
          console.log(details.matricula);
        }

      } catch (error) {
        console.error('Error al obtener detalles:', error);
      }
    };

    fetchDetails();
  }, [matricula]);

  //Info de files-procedure
  useEffect(() => {
    if(!matricula) return;

    const fetchFiles = async () => {
      try{
        const response = await axios.get(`https://movilidadback.ujed.mx/intercambio/files-procedure/`, {
          params: { matricula },
        });
        console.log(response.data);
        //console.log(response.data.requeriment.description)
        setFiles(response.data);
      }catch(error){
        console.error('Error al obtener los archivos:', error);
      }
    };
    fetchFiles();
  }, [matricula])

  return (
    <div>
      <Typography variant="h4" component="h2" style={{ marginBottom: '20px' }}>
        Detalle de la Solicitud
      </Typography>

      <Grid container spacing={2}>

        <Grid item xs={12} md={8}>
          {/* Solicitante */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Solicitante</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {/* Sección de Solicitarte */}
                <Grid item xs={12} md={3}>
                  <div>
                    <Typography variant="body1" style={{ fontWeight: 'light', fontSize: '12px' }}>
                      Tipo
                    </Typography>
                    <Typography variant="body2">{detalle?.type === 'I' ? 'Internacional' : detalle?.type === 'N' ? 'Nacional' : 'No disponible'}</Typography>
                  </div>
                </Grid>
                <Grid item xs={12} md={3}>
                  <div>
                    <Typography variant="body1" style={{ fontWeight: 'light', fontSize: '12px' }}>
                      Estudiante
                    </Typography>
                    <Typography variant="body2">{detalle?.nombre || 'No disponible'}</Typography>
                  </div>
                </Grid>
                <Grid item xs={12} md={3}>
                  <div>
                    <Typography variant="body1" style={{ fontWeight: 'light', fontSize: '12px' }}>
                      Matrícula
                    </Typography>
                    <Typography variant="body2">{detalle?.matricula || 'No disponible'}</Typography>
                  </div>
                </Grid>
                <Grid item xs={12} md={3}>
                  <div>
                    <Typography variant="body1" style={{ fontWeight: 'light', fontSize: '12px' }}>
                      Ciclo Actual
                    </Typography>
                    <Typography variant="body2">{detalle?.semestre || 'No disponible'}</Typography>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div>
                    <Typography variant="body1" style={{ fontWeight: 'light', fontSize: '12px' }}>
                      Correo
                    </Typography>
                    <Typography variant="body2">{detalle?.correo || 'No disponible'}</Typography>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div>
                    <Typography variant="body1" style={{ fontWeight: 'light', fontSize: '12px' }}>
                      Carrera
                    </Typography>
                    <Typography variant="body2">{detalle?.carrera || 'No disponible'}</Typography>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div>
                    <Typography variant="body1" style={{ fontWeight: 'light', fontSize: '12px' }}>
                      Unidad
                    </Typography>
                    <Typography variant="body2">{detalle?.unidad_academica || 'No disponible'}</Typography>
                  </div>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Documentos */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Documentos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{marginBottom: '20px', padding: '1rem'}}>
                <Typography variant="body2">Valida que la documentación entregada por el solicitante sea correcta para continuar con el trámite. En caso de que un documento no cumpla con los requisitos, se le pedirá al solicitante volver a adjuntarlo.</Typography>
              </div>
              <div className='documentos' style={{marginBottom: '20px', padding: '1rem'}}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableBody>
                      {files.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell component="th" scope="row">
                            <img src={IconoPDF} alt="Icono Pdf" style={{padding: '5px'}}/>
                            <a href={file.url_doc} target='_blank'>{file.requirement.slug}</a>
                          </TableCell>
                          <TableCell align="center"><Button variant="outlined" color="success" size="small" style={{ display: 'block', margin: '0 auto', marginTop: '1rem'}}>Aceptar</Button></TableCell>
                          <TableCell align="center"><Button variant="outlined" color="error" size="small" style={{ display: 'block', margin: '0 auto', marginTop: '1rem'}}>Rechazar</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </AccordionDetails>
          </Accordion>

        </Grid>

        <Grid item xs={12} md={4}>
          {/* Actividad */}
          <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Actividad</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{marginBottom: '10px', padding: '1rem'}}>
                  <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '8px' }}> Revisión de documentos </Typography>
                  <Typography variant="body2">Valida que los documentos de la solicitud cumplan con los requisitos.</Typography>
                </div>
                <div style={{marginBottom: '10px', padding: '1rem'}}>
                  <Typography variant="body1" style={{ fontWeight: 'light', fontSize: '14px', marginBottom: '8px' }}> Fecha de solicitud </Typography>
                  <Typography variant="body2">{detalle?.fecha || 'No disponible'}</Typography>
                </div>
                <div style={{marginBottom: '20px', padding: '1rem'}}>
                  <Typography variant="body2">Rechaza la solicitud en caso de que sea una solicitud errónea. Se notificará al solicitante por correo electrónico. Esta acción es irreversible.</Typography>
                  <Button variant="contained" color="error" style={{ display: 'block', margin: '0 auto', marginTop: '1rem'}}>Rechazar trámite</Button>
                </div>
              </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>

  );
}

export default Detalles;
