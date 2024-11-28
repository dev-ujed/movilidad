import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

import ApiService from './ApiServices';
import BuscadoryFiltros from './BuscadoryFiltros';


function createData(solicita, unidadAcademica, carrera, fechasolicitud, estado) {
  return { solicita, unidadAcademica, carrera, fechasolicitud, estado };
}

const initialRows = [
    createData('Litzy Nevarez', 'Facultad De Trabajo Social Exactas', 'Licenciado En Trabajo Social', '8/nov/2024, 1:28 pm', 'En espera'),
    createData('Juan Pérez', 'Facultad de Ingeniería', 'Ingeniería Civil', '9/nov/2024, 2:30 pm', 'Aprobado'),
    createData('Ana López', 'Facultad de Medicina', 'Medicina General', '10/nov/2024, 11:45 am', 'Rechazado'),
];

export default function EnProceso() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [rows, setRows] = useState(initialRows);
  const [selectedEstado, setSelectedEstado] = useState('');
  const [estados, setEstados] = useState([]);
  
  const [selectedTipo, setSelectedTipo] = useState('');
  const navigate = useNavigate();

  // Información para la tabla
  const columns = [
  { id: 'matricula', label: 'Matricula', minWidth: 170 },
  { id: 'nombre', label: 'Solicita', minWidth: 170 },
  { id: 'fechasolicitud', label: 'Fecha de solicitud', minWidth: 100 },
  { id: 'estado', label: 'Estado', minWidth: 100 },
  {
    id: 'acciones',
    label: '',
    minWidth: 100,
    render: (row) => (
      <Button
        variant="contained"
        style={{ backgroundColor: 'rgb(126, 173, 113)', color: 'white' }}
        onClick={() => handleAction(row)}
      >
        Ver
      </Button>
    ),
  },
  ];

  // Función para manejar la acción del botón
  const handleAction = (row) => {
  navigate(`/main/detalles/${row.matricula}`);
  //console.log('Detalles de la fila:', row);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    const filteredRows = initialRows.filter((row) =>
      Object.values(row).some((val) =>
        val.toString().toLowerCase().includes(value)
      )
    );

    setRows(filteredRows);
  };

  // Función para manejar el cambio de estado y actualizar la tabla
  const handleEstadoChange = (event) => {
    const estadoId = event.target.value;
    setSelectedEstado(estadoId);

    if (estadoId) {
      ApiService.fetchProceduresByEstado(estadoId)
        .then(data => setRows(data))
        .catch(console.error);
    }
  };

  // Función para manejar el cambio del tipo a la tabla
  const handleChangeTipo = (event) => {
    const tipoSeleccionado = event.target.value;
    setSelectedTipo(tipoSeleccionado);

    ApiService.fetchProceduresByTipo(tipoSeleccionado)
      .then(data => setRows(data))
      .catch(console.error);
  };

  useEffect(() => {
    const fetchData = async () => {
      try{
        const formattedData = await ApiService.fetchProcedures();
        setRows(formattedData);
      }catch (error) {
        console.error('Error al procesar los datos:', error);
      }
    }

    ApiService.fetchEstados().then(setEstados).catch(console.error);
    
    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h2" style={{ marginBottom: '20px' }}>
        Lista de Solicitudes
      </Typography>
        
      <BuscadoryFiltros
        searchValue={searchValue}
        handleSearch={handleSearch}
        estados={estados}
        selectedEstado={selectedEstado}
        handleEstadoChange={handleEstadoChange}
        selectedTipo={selectedTipo}
        handleChangeTipo={handleChangeTipo}
      />
      
      {/* Inicio de la tabla */}
      <div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.render
                              ? column.render(row)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
