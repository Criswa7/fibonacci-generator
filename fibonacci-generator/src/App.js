import React from 'react';
import FibonacciGenerator from './FibonacciGenerator';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Aplicación Generadora de Fibonacci</h1>
        <FibonacciGenerator />
      </header>
    </div>
  );
}

export default App;