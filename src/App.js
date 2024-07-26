import React from 'react';
import ParticlesBackground from './ParticlesBackground';
import Form from './Form';
import './App.css';

function App() {
  return (
    <div className="App">
      <ParticlesBackground />
      <div className="content">
        <h1 className="main-heading">Welcome to Annual Exhibition</h1>
        <h1 className="sub-heading">Knowledge Kaleidoscope.</h1>
        <Form />
      </div>
    </div>
  );
}

export default App;