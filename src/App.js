import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Header  from './components/mainmenu';
import Banner from './components/banner';
import Conbocatoria from './components/convocatoria';
import Pasos from './components/pasos';
import Experiencias from './components/expereciencias';
import Footer from './components/Footer';
import Destinos from './components/pages/destinos';
import Documentos from './components/pages/documentos';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><Banner /><Conbocatoria /><Pasos /><Experiencias /><Footer /></>} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path="/documentos" element={<Documentos />} />
      </Routes>
    </Router>
  );
}

export default App;


