import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function BuscadoryFiltros({ searchValue, handleSearch, estados, selectedEstado, handleEstadoChange, selectedTipo, handleChangeTipo }) {
    return (
        <div className="d-flex flex-column flex-sm-row justify-content-between mb-4">
          {/* Buscador */}
          <div style={{ marginBottom: '20px' }}>
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
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
    
          {/* Filtros */}
          <div className="filtros">
            <div>
              <FormControl sx={{ width: 300 }}>
                <InputLabel id="estado-select-label">Ordenar por estado</InputLabel>
                <Select
                  labelId="estado-select-label"
                  id="estado-select"
                  value={selectedEstado}
                  label="Ordenar por estado"
                  onChange={handleEstadoChange}
                  sx={{ marginBottom: 2 }}
                >
                  {estados.map((estado) => (
                    <MenuItem key={estado.id} value={estado.id}>
                      {estado.slug}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ width: 300 }}>
                <InputLabel id="tipo-select-label">Ordenar por tipo</InputLabel>
                <Select
                  labelId="tipo-select-label"
                  id="tipo-select"
                  value={selectedTipo}
                  label="Ordenar por tipo"
                  onChange={handleChangeTipo}
                >
                  <MenuItem value="Internacional">Internacional</MenuItem>
                  <MenuItem value="Nacional">Nacional</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
    );
}

export default BuscadoryFiltros;
