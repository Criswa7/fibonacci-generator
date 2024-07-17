import React, { useState, useEffect } from 'react';

function FibonacciGenerator() {
  const [fibonacciSeries, setFibonacciSeries] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [seeds, setSeeds] = useState({ X: 0, Y: 0 });
  const [numberCount, setNumberCount] = useState(0);
  const [generationTime, setGenerationTime] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('es-ES'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateFibonacci = (hours, minutes, seconds) => {
    const X = Math.floor(minutes / 10);
    const Y = minutes % 10;
    setSeeds({ X, Y });
    setNumberCount(seconds);
    setGenerationTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

    let series = [Y, X];
    for (let i = 2; i < seconds + 2; i++) {
      series.push(series[i-1] + series[i-2]);
    }

    setFibonacciSeries(series.reverse());
  };

  const handleCustomTimeSubmit = (e) => {
    e.preventDefault();
    const [hours, minutes, seconds] = customTime.split(':').map(Number);
    generateFibonacci(hours, minutes, seconds);
  };

  const handleCurrentTimeGenerate = () => {
    const now = new Date();
    generateFibonacci(now.getHours(), now.getMinutes(), now.getSeconds());
  };

  return (
    <div>
      <h2>Generador de Fibonacci</h2>
      <p>Hora actual: {currentTime}</p>
      
      <form onSubmit={handleCustomTimeSubmit}>
        <input 
          type="time" 
          step="1"
          value={customTime} 
          onChange={(e) => setCustomTime(e.target.value)}
          required
        />
        <button type="submit">Generar con hora personalizada</button>
      </form>

      <button onClick={handleCurrentTimeGenerate}>Generar con hora actual</button>

      {fibonacciSeries.length > 0 && (
        <div>
          <h3>Resultados:</h3>
          <p>Hora de generación: {generationTime}</p>
          <p>Semillas: X = {seeds.X}, Y = {seeds.Y}</p>
          <p>Números producidos: {numberCount}</p>
          <p>Serie Fibonacci: {fibonacciSeries.join(', ')}</p>
          <button onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? 'Ocultar información' : 'Mostrar información'}
          </button>
          {showInfo && (
            <p>
              La serie Fibonacci se genera utilizando los minutos como semillas (X = decenas de minutos, Y = unidades de minutos) 
              y los segundos como la cantidad de números a producir. La serie se muestra en orden descendente.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default FibonacciGenerator;