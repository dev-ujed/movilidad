import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/mainmenu';
import Banner from './components/banner';
import Conbocatoria from './components/convocatoria';
import Pasos from './components/pasos';
import Experiencias from './components/expereciencias';
import Footer from './components/Footer';
import Destinos from './components/pages/destinos';
import Documentos from './components/pages/documentos';
import Login from './components/admin/login';
import Main from './components/admin/main';
import Registro from './components/admin/registro';
import PrivateRoute from './components/admin/privateRoute';
import EnProceso from './components/admin/EnProceso';
import Inicio from './components/admin/inicio';
import Detalles from './components/admin/detalles';
import Atendidos from './components/admin/atendidos';
import Rechazados from './components/admin/rechazados';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<><Header /><Banner /><Conbocatoria /><Pasos /><Experiencias /><Footer /></>} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Ruta protegida del dashboard */}
        <Route path="/main" element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }>
          {/* Rutas hijas dentro de /dashboard */}
          <Route path="inicio" element={<Inicio />} />
          <Route path="en-proceso" element={<EnProceso />} />
          <Route path="detalles/:matricula" element={<Detalles />} />
          <Route path="atendidos" element={<Atendidos />} />
          <Route path="rechazados" element={<Rechazados />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
