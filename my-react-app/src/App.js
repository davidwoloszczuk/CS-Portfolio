import React from 'react';
import Sidebar from './components/Sidebar';
import './styles/styles.css'; // Import the global styles

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="content">
        <h1>Welcome to My Portfolio</h1>
        <p>This is the main content area. Here you can add information about your projects, skills, and more.</p>
      </div>
    </div>
  );
}

export default App;