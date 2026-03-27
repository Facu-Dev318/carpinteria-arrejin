import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Philosophy from './pages/Philosophy';
import Capacity from './pages/Capacity';
import Leadership from './pages/Leadership';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/filosofia" element={<Philosophy />} />
            <Route path="/capacidad" element={<Capacity />} />
            <Route path="/direccion" element={<Leadership />} />
            <Route path="/trabaja" element={<Careers />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
