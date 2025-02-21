import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import Button from './components/Button';
import Sidebar from './components/Sidebar';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Extras from './pages/Extras';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <main>
          <Routes>
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/extras" element={<Extras />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={
              <div>
                <h1>Welcome to My Portfolio</h1>
                <Button />
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;