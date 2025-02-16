import React from 'react';
import './styles/index.css';
import Button from './components/Button';
import Sidebar from './components/Sidebar';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';
import Projects from './pages/Projects';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Sidebar />
      <Button />
      <main>
        <AboutMe />
        <Contact />
        <Projects />
      </main>
    </div>
  );
}

export default App;