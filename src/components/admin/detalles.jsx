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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
  const [open, setRechazar] = React.useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [comentario, setComentario] = React.useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [successMessage2, setSuccessMessage2] = useState(false);
  const [allAccepted, setAllAccepted] = useState(false);

  const [openDocumentoModal, setOpenDocumentoModal] = useState(false);
  const [openSolicitudModal, setOpenSolicitudModal] = useState(false);

  const aceptarDocumento = async (id, state) => {
    try{
      const response = await axios.patch(
        `https://movilidadback.ujed.mx/intercambio/documents-procedure/change-state/${id}/`,
        {
          state,
        }
      );

      console.log("Documento aceptado:", response.data);
      setSuccessMessage2(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    }catch(error){
      console.error("Error en aceptar el archivo:", error);
    }
  }

  const rechazarDocumento = async (id, state, comentario) => {
    console.log(id)
    try{
      const response = await axios.patch(
        `https://movilidadback.ujed.mx/intercambio/documents-procedure/decline-document/${id}/`,
          {
            state, comentario,
          },
          {
            headers: {
              'Content-Type': 'application/json',
          },
        }
      );

      console.log("Datos del boton rechazar:", response.data);
      setSuccessMessage(true);
      setRechazar(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    }catch(error){
      console.error("Error al rechazar archivo:", error);
    }
  };

  const aceptarSolicitud = async (id, state) => {
    console.log("id procedure:", id);
    console.log("estado:", state);
    try {
      const response = await axios.patch(
        `https://movilidadback.ujed.mx/intercambio/procedures/change-state/${id}/`,
        { state }
      );

      console.log('Solicitud aceptada:', response.data);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('Error en aceptar la solicitud:', error);
    }
  };

  const rechazarSolicitud = async (id, state, comentario) => {
    try {
      const response = await axios.patch(
        `https://movilidadback.ujed.mx/intercambio/procedures/change-state/${id}/`,
        { state }
      );

      const response2 = await axios.patch(`https://movilidadback.ujed.mx/intercambio/procedures/add-comment/${id}/`,
        {
          comentario,
        },
      );

      console.log('Solicitud rechazada:', response2.data);
      console.log('Solicitud rechazada:', response.data);
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      
    } catch (error) {
      console.error('Error en aceptar la solicitud:', error);
    }

  };

  // Función para abrir el modal de rechazo de documento
  const handleOpenRechazarDocumentoModal = (id) => {
    setSelectedFileId(id);
    setOpenDocumentoModal(true);
  };

  // Función para abrir el modal de rechazo de solicitud
  const handleOpenRechazarSolicitudModal = (id) => {
    setSelectedFileId(id);
    setOpenSolicitudModal(true);
  };

  // Función para cerrar ambos modales
  const handleCloseModals = () => {
    setOpenDocumentoModal(false);
    setOpenSolicitudModal(false);
  };

  //Info de procedures
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://movilidadback.ujed.mx/intercambio/procedures/`, { params: { matricula } });

        if(response.data.length > 0){
          const details = response.data[0]; 
          setDetalle(details);
          //console.log(details);
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
        const response = await axios.get(`https://movilidadback.ujed.mx/intercambio/documents-procedure/`, {
          params: { matricula },
        });
        //console.log(response.data);
        //console.log(response.data.requeriment.description)
        setFiles(response.data);

        // Verificar si todos los documentos están aceptados
        const allAcceptedStatus = response.data.every((file) => file.state === 5);
        setAllAccepted(allAcceptedStatus);
      }catch(error){
        console.error('Error al obtener los archivos:', error);
      }
    };

    fetchFiles();
  }, [matricula])

  return (
    <div style={{background: '#F0F2F3'}}>
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
            <AccordionDetails style={{ maxHeight: '350px', overflowY: 'auto' }}>
              <div style={{ marginBottom: '20px', padding: '1rem' }}>
                <Typography variant="body2">
                  Valida que la documentación entregada por el solicitante sea correcta para continuar con el trámite. En caso de que un documento no cumpla con los requisitos, se le pedirá al solicitante volver a adjuntarlo.
                </Typography>
              </div>
              <div className="documentos" style={{ marginBottom: '20px', padding: '1rem' }}>
                <TableContainer component={Paper} >
                  <Table sx={{ minWidth: 650 }}>
                    <TableBody>
                      {files.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell component="th" scope="row">
                            <img src={IconoPDF} alt="Icono Pdf" style={{ padding: '5px' }} />
                            <a href={file.url_doc} target="_blank" rel="noopener noreferrer">
                              {file.requirement.slug}
                            </a>
                          </TableCell>

                          {/* Mostrar mensaje basado en el estado */}
                          {file.state === 5 && (
                            <TableCell align="center">
                              <Typography variant="body2" color="success">
                                Aceptado
                              </Typography>
                            </TableCell>
                          )}

                          {file.state === 6 && (
                            <TableCell align="center">
                              <Typography variant="body2" color="error">
                                Rechazado
                              </Typography>
                            </TableCell>
                          )}

                          {/* Mostrar botones solo si no está aceptado ni rechazado */}
                          {detalle?.state.id !== 3 && detalle?.state.id !== 4 && 
                          file.state !== 5 && file.state !== 6 && (
                            <>
                              <TableCell align="center">
                                <Button
                                  onClick={() => aceptarDocumento(file.id, 5)}
                                  variant="outlined"
                                  color="success"
                                  size="small"
                                  style={{ display: 'block', margin: '0 auto', marginTop: '1rem' }}
                                >
                                  Aceptar
                                </Button>
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  onClick={() => handleOpenRechazarDocumentoModal(file.id)}
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  style={{ display: 'block', margin: '0 auto', marginTop: '1rem' }}
                                >
                                  Rechazar
                                </Button>
                              </TableCell>
                            </>
                          )}
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
                {detalle?.state.id === 3 || detalle?.state.id === 4 ? (
                  <Typography variant="body2" style={{ fontWeight: 'bold', fontSize: '1rem' }}>La solicitud ya ha sido {detalle?.state.id === 3 ? 'aceptada' : 'rechazada'}.</Typography>
                ) : (
                  <>
                    <div style={{marginBottom: '10px', padding: '1rem'}}>
                      <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '8px' }}> Revisión de documentos </Typography>
                      <Typography variant="body2">Valida que los documentos de la solicitud cumplan con los requisitos.</Typography>
                    </div>
                    <div style={{marginBottom: '10px', padding: '1rem'}}>
                      <Typography variant="body1" style={{ fontWeight: 'light', fontSize: '14px', marginBottom: '8px' }}> Fecha de solicitud </Typography>
                      <Typography variant="body2">{detalle?.fecha || 'No disponible'}</Typography>
                    </div>
                    <div style={{marginBottom: '20px', padding: '1rem'}}>
                      {files.some(file => file.state !== 5) && (
                        <>
                          <Typography variant="body2">Rechaza la solicitud en caso de que sea una solicitud errónea. Se notificará al solicitante por correo electrónico. Esta acción es irreversible.</Typography>
                          <Button 
                          variant="contained" color="error" 
                          style={{ display: 'block', margin: '0 auto', marginTop: '1rem'}}
                          onClick={() => handleOpenRechazarSolicitudModal(detalle.id)}>Rechazar Solicitud</Button>
                        </>
                      )}
                      
                      {files.every(file => file.state === 5) && (
                        <>
                          <Typography variant="body2" style={{ marginBottom: '1rem', marginTop: '1rem' }}>Todos los documentos han sido aceptados, ya puede aceptar la solicitud.</Typography>
                          <Button 
                          variant="contained" color="success" 
                          style={{ display: 'block', margin: '0 auto', marginTop: '1rem' }}
                          onClick={() => aceptarSolicitud(detalle.id, 3)}>Aceptar Solicitud</Button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      {/* Modal para comentar el motivo del rechazo */}
      <Modal
        open={openDocumentoModal}
        onClose={handleCloseModals}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Rechazar documento
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Explicar brevemente el motivo de rechazo del documento
          </Typography>
          <form onSubmit={(e) => {
            e.preventDefault();
            rechazarDocumento(selectedFileId, 6, comentario);
          }}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                label="Comentario"
                variant="outlined"
                fullWidth
                autoFocus
                required
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
              <Button type="submit" variant="contained" color="error">
                Rechazar
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>

      {/* Modal para comentar el motivo de la SOLICITUD */}
      <Modal
        open={openSolicitudModal}
        onClose={handleCloseModals}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Rechazar documento
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Explicar brevemente el motivo de rechazo de la solicitud
          </Typography>
          <form onSubmit={(e) => {
            e.preventDefault();
            rechazarSolicitud(selectedFileId, 4, comentario);
          }}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                label="Comentario"
                variant="outlined"
                fullWidth
                autoFocus
                required
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
              <Button type="submit" variant="contained" color="error">
                Rechazar
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>

      {/* Snackbar para mensaje de éxito */}
      <Snackbar
        open={successMessage}
        autoHideDuration={3000} // Duración del mensaje en milisegundos
        onClose={() => setSuccessMessage(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccessMessage(false)} severity="success" sx={{ width: "100%" }}>
          Documento rechazado exitosamente.
        </Alert>
      </Snackbar>

      {/* Snackbar para mensaje de éxito */}
      <Snackbar
        open={successMessage2}
        autoHideDuration={3000} // Duración del mensaje en milisegundos
        onClose={() => setSuccessMessage2(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccessMessage2(false)} severity="success" sx={{ width: "100%" }}>
          Documento Aprobado exitosamente.
        </Alert>
      </Snackbar>
    </div>

  );
}

export default Detalles;
