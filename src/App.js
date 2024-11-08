import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/mainmenu';
import Banner from './components/banner';
import Conbocatoria from './components/convocatoria';
import Pasos from './components/pasos';
import Experiencias from './components/expereciencias';
import Footer from './components/Footer';
import Destinos from './components/pages/destinos';
import Documentos from './components/pages/documentos';
import Login from './components/admin/login';
import Dashboard from './components/admin/dashboard';
import Registro from './components/admin/registro';
import PrivateRoute from './components/admin/privateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><Banner /><Conbocatoria /><Pasos /><Experiencias /><Footer /></>} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* Protege la ruta del dashboard */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
