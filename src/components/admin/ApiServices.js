import axios from 'axios';

class ApiService{
    static async fetchProcedures() {
        try {
            const response = await axios.get('https://movilidadback.ujed.mx/intercambio/procedures/');
            const data = response.data;
      
            if (Array.isArray(data)) {
              return data.map(item => ({
                id: item.id,
                matricula: item.matricula,
                nombre: item.nombre || 'No disponible',
                fechasolicitud: item.fecha,
                estado: item.state ? item.state.slug : 'Sin estado',
              }));
            } else {
              console.error('La respuesta no contiene un array en la propiedad "results"');
              return [];
            }
          } catch (error) {
            console.error('Error al obtener los datos de procedures:', error);
            throw error;
          }
    }

    static async fetchProceduresFinalizadas() {
      try {
        const url = `https://movilidadback.ujed.mx/intercambio/procedures/?&state=3`;
        const response = await axios.get(url);

        const data = response.data;

        if (Array.isArray(data)) {
          return data.map(item => ({
            id: item.id,
            matricula: item.matricula,
            nombre: item.nombre || 'No disponible',
            fechasolicitud: item.fecha,
            estado: item.state ? item.state.slug : 'Sin estado',
          }));
        } else {
          console.error('La respuesta no contiene un array en la propiedad "results"');
          return [];
        }

      } catch (error) {
        console.error('Error al filtrar por estado:', error);
        throw error;
      }
    }

    static async fetchProceduresRechazadas() {
      try {
        const url = `https://movilidadback.ujed.mx/intercambio/procedures/?&state=4`;
        const response = await axios.get(url);

        const data = response.data;

        if (Array.isArray(data)) {
          return data.map(item => ({
            id: item.id,
            matricula: item.matricula,
            nombre: item.nombre || 'No disponible',
            fechasolicitud: item.fecha,
            estado: item.state ? item.state.slug : 'Sin estado',
          }));
        } else {
          console.error('La respuesta no contiene un array en la propiedad "results"');
          return [];
        }

      } catch (error) {
        console.error('Error al filtrar por estado:', error);
        throw error;
      }
    }

    static async fetchEstados() {
        try {
          const response = await axios.get('https://movilidadback.ujed.mx/intercambio/states/');
          return response.data;

        } catch (error) {
          console.error('Error al obtener los estados:', error);
          throw error;
        }
    }
    
    static async fetchProceduresByEstado(estadoId) {
        try {
          const url = `https://movilidadback.ujed.mx/intercambio/procedures/?&state=${estadoId}`;
          const response = await axios.get(url);

          const data = response.data;

          if (Array.isArray(data)) {
            return data.map(item => ({
              id: item.id,
              matricula: item.matricula,
              nombre: item.nombre || 'No disponible',
              fechasolicitud: item.fecha,
              estado: item.state ? item.state.slug : 'Sin estado',
            }));
          } else {
            console.error('La respuesta no contiene un array en la propiedad "results"');
            return [];
          }

        } catch (error) {
          console.error('Error al filtrar por estado:', error);
          throw error;
        }
    }
    
      static async fetchProceduresByTipo(tipo) {
        try {
          const tipoAbbr = tipo === 'Internacional' ? 'I' : 'N';
          const url = `https://movilidadback.ujed.mx/intercambio/procedures/?&type=${tipoAbbr}`;
          const response = await axios.get(url);

          const data = response.data;

          if (Array.isArray(data)) {
            return data.map(item => ({
              id: item.id,
              matricula: item.matricula,
              nombre: item.nombre || 'No disponible',
              fechasolicitud: item.fecha,
              estado: item.state ? item.state.slug : 'Sin estado',
            }));
          } else {
            console.error('La respuesta no contiene un array en la propiedad "results"');
            return [];
          }
          
        } catch (error) {
          console.error('Error al filtrar por tipo:', error);
          throw error;
        }
    }

}



export default ApiService;