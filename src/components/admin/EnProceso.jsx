import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';


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
  console.log('Detalles de la fila:', row);
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

  //API para ver los estudiantes de la tabla procedures
  const fetchData = async () => {
    try{
      const response = await axios.get('https://movilidadback.ujed.mx/intercambio/procedures/');
      const data = response.data.results;

      if(Array.isArray(data)){
        const formattedData = data.map(item => ({
          id: item.id,
          matricula: item.matricula,
          nombre: item.nombre || 'No disponible',
          fechasolicitud: item.fecha,
          estado: item.state ? item.state.slug : 'Sin estado', 
        }));
        setRows(formattedData);
      }else{
        console.error('La respuesta no contiene un array en la propiedad "results"');
      }
      
    }catch(error){
      console.error('Error al obtener los datos:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h2" style={{ marginBottom: '20px' }}>
        Lista de Solicitudes
      </Typography>
      <div style={{marginBottom:'20px'}}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar Tramite"
            inputProps={{ 'aria-label': 'Buscar trámite' }}
            value={searchValue}
            onChange={handleSearch}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
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
