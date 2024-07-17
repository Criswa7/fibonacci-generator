import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField, Typography, Paper, Grid, IconButton, CircularProgress } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { generateFibonacci, addToHistory } from './fibonacciSlice';

function FibonacciGenerator() {
  const [currentTime, setCurrentTime] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  
  const dispatch = useDispatch();
  const { fibonacciSeries, seeds, numberCount, generationTime, status, error } = useSelector(state => state.fibonacci);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('es-ES'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCustomTimeSubmit = (e) => {
    e.preventDefault();
    const [hours, minutes, seconds] = customTime.split(':').map(Number);
    dispatch(generateFibonacci({ hours, minutes, seconds }));
  };

  const handleCurrentTimeGenerate = () => {
    const now = new Date();
    dispatch(generateFibonacci({ 
      hours: now.getHours(), 
      minutes: now.getMinutes(), 
      seconds: now.getSeconds() 
    }));
  };

  useEffect(() => {
    if (status === 'succeeded' && fibonacciSeries.length > 0) {
      dispatch(addToHistory({ time: generationTime, series: fibonacciSeries }));
    }
  }, [status, fibonacciSeries, generationTime, dispatch]);

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Generador de Fibonacci
        <IconButton onClick={() => setShowInfo(!showInfo)} size="small">
          <InfoIcon />
        </IconButton>
      </Typography>
      
      {showInfo && (
        <Typography variant="body2" paragraph>
          La serie Fibonacci se genera utilizando los minutos como semillas (X = decenas de minutos, Y = unidades de minutos) 
          y los segundos como la cantidad de números a producir. La serie se muestra en orden descendente.
        </Typography>
      )}

      <Typography variant="h6">Hora actual: {currentTime}</Typography>
      <Button variant="contained" color="primary" onClick={handleCurrentTimeGenerate} style={{ marginTop: '10px' }}>
        Generar con hora actual
      </Button>

      <form onSubmit={handleCustomTimeSubmit} style={{ marginTop: '20px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              type="time"
              inputProps={{ step: 1 }}
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              required
              label="Hora personalizada"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="secondary">
              Generar con hora personalizada
            </Button>
          </Grid>
        </Grid>
      </form>

      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && <Typography color="error">{error}</Typography>}
      {status === 'succeeded' && fibonacciSeries.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Resultados:</Typography>
          <Typography>Hora de generación: {generationTime}</Typography>
          <Typography>Semillas: X = {seeds.X}, Y = {seeds.Y}</Typography>
          <Typography>Números producidos: {numberCount}</Typography>
          <Typography>Serie Fibonacci: {fibonacciSeries.join(', ')}</Typography>
        </div>
      )}
    </Paper>
  );
}

export default FibonacciGenerator;