import './App.css';
import  Header  from './components/mainmenu';
import Banner from './components/banner';
import Conbocatoria from './components/convocatoria';
import Pasos from './components/pasos';
import Experiencias from './components/expereciencias';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Conbocatoria />
      <Pasos />
      <Experiencias />
      <Footer />
    </div>
  );
}

export default App;


